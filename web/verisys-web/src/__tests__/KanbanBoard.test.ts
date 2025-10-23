import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import KanbanBoard from '../components/KanbanBoard.vue';
import type { TaskItem } from '../types';

describe('KanbanBoard', () => {
  const mockTasks: TaskItem[] = [
    { id: 1, title: 'Task 1', status: 'todo' },
    { id: 2, title: 'Task 2', status: 'doing' },
    { id: 3, title: 'Task 3', status: 'done' },
    { id: 4, title: 'Task 4', status: 'todo' },
  ];

  it('renders all three columns', () => {
    const wrapper = mount(KanbanBoard, {
      props: { tasks: mockTasks },
    });

    expect(wrapper.text()).toContain('To-Do');
    expect(wrapper.text()).toContain('Doing');
    expect(wrapper.text()).toContain('Done');
  });

  it('displays correct task count in each column', () => {
    const wrapper = mount(KanbanBoard, {
      props: { tasks: mockTasks },
    });

    const columns = wrapper.findAll('.col');
    
    // Todo column should have 2 tasks
    expect(columns[0].find('small').text()).toBe('2');
    // Doing column should have 1 task
    expect(columns[1].find('small').text()).toBe('1');
    // Done column should have 1 task
    expect(columns[2].find('small').text()).toBe('1');
  });

  it('filters tasks by status correctly', () => {
    const wrapper = mount(KanbanBoard, {
      props: { tasks: mockTasks },
    });

    const columns = wrapper.findAll('.col');
    
    // Check todo column
    const todoCards = columns[0].findAll('.card');
    expect(todoCards).toHaveLength(2);
    expect(todoCards[0].text()).toContain('Task 1');
    expect(todoCards[1].text()).toContain('Task 4');

    // Check doing column
    const doingCards = columns[1].findAll('.card');
    expect(doingCards).toHaveLength(1);
    expect(doingCards[0].text()).toContain('Task 2');

    // Check done column
    const doneCards = columns[2].findAll('.card');
    expect(doneCards).toHaveLength(1);
    expect(doneCards[0].text()).toContain('Task 3');
  });

  it('renders move left button only for doing and done columns', () => {
    const wrapper = mount(KanbanBoard, {
      props: { tasks: mockTasks },
    });

    const columns = wrapper.findAll('.col');
    
    // Todo tasks should not have move left button
    const todoCards = columns[0].findAll('.card');
    todoCards.forEach(card => {
      const buttons = card.findAll('button');
      const hasLeftButton = buttons.some(btn => btn.attributes('title') === 'Move left');
      expect(hasLeftButton).toBe(false);
    });

    // Doing tasks should have move left button
    const doingCards = columns[1].findAll('.card');
    doingCards.forEach(card => {
      const buttons = card.findAll('button');
      const hasLeftButton = buttons.some(btn => btn.attributes('title') === 'Move left');
      expect(hasLeftButton).toBe(true);
    });

    // Done tasks should have move left button
    const doneCards = columns[2].findAll('.card');
    doneCards.forEach(card => {
      const buttons = card.findAll('button');
      const hasLeftButton = buttons.some(btn => btn.attributes('title') === 'Move left');
      expect(hasLeftButton).toBe(true);
    });
  });

  it('renders move right button only for todo and doing columns', () => {
    const wrapper = mount(KanbanBoard, {
      props: { tasks: mockTasks },
    });

    const columns = wrapper.findAll('.col');
    
    // Todo tasks should have move right button
    const todoCards = columns[0].findAll('.card');
    todoCards.forEach(card => {
      const buttons = card.findAll('button');
      const hasRightButton = buttons.some(btn => btn.attributes('title') === 'Move right');
      expect(hasRightButton).toBe(true);
    });

    // Doing tasks should have move right button
    const doingCards = columns[1].findAll('.card');
    doingCards.forEach(card => {
      const buttons = card.findAll('button');
      const hasRightButton = buttons.some(btn => btn.attributes('title') === 'Move right');
      expect(hasRightButton).toBe(true);
    });

    // Done tasks should not have move right button
    const doneCards = columns[2].findAll('.card');
    doneCards.forEach(card => {
      const buttons = card.findAll('button');
      const hasRightButton = buttons.some(btn => btn.attributes('title') === 'Move right');
      expect(hasRightButton).toBe(false);
    });
  });

  it('emits update event when move right button is clicked', async () => {
    const wrapper = mount(KanbanBoard, {
      props: { tasks: mockTasks },
    });

    const columns = wrapper.findAll('.col');
    const todoColumn = columns[0];
    const firstCard = todoColumn.findAll('.card')[0];
    
    const moveRightBtn = firstCard.findAll('button').find(btn => 
      btn.attributes('title') === 'Move right'
    );
    
    await moveRightBtn!.trigger('click');

    expect(wrapper.emitted('update')).toBeTruthy();
    const updateEvent = wrapper.emitted('update') as any[];
    expect(updateEvent[0][0]).toMatchObject({
      id: 1,
      title: 'Task 1',
      status: 'doing',
    });
  });

  it('emits update event when move left button is clicked', async () => {
    const wrapper = mount(KanbanBoard, {
      props: { tasks: mockTasks },
    });

    const allCards = wrapper.findAll('.card');
    // Find the card in the "doing" column (Task 2)
    const doingCard = allCards.find(card => card.text().includes('Task 2'));
    
    const moveLeftBtn = doingCard!.findAll('button').find(btn => 
      btn.attributes('title') === 'Move left'
    );
    
    await moveLeftBtn!.trigger('click');

    expect(wrapper.emitted('update')).toBeTruthy();
    const updateEvent = wrapper.emitted('update') as any[];
    expect(updateEvent[0][0]).toMatchObject({
      id: 2,
      title: 'Task 2',
      status: 'todo',
    });
  });

  it('emits update event when status dropdown is changed', async () => {
    const wrapper = mount(KanbanBoard, {
      props: { tasks: mockTasks },
    });

    const allCards = wrapper.findAll('.card');
    // Find Task 1 card
    const task1Card = allCards.find(card => card.text().includes('Task 1'));
    
    const select = task1Card!.find('select');
    await select.setValue('done');

    expect(wrapper.emitted('update')).toBeTruthy();
    const updateEvent = wrapper.emitted('update') as any[];
    expect(updateEvent[0][0]).toMatchObject({
      id: 1,
      title: 'Task 1',
      status: 'done',
    });
  });

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mount(KanbanBoard, {
      props: { tasks: mockTasks },
    });

    const allCards = wrapper.findAll('.card');
    // Find the first card (Task 1)
    const firstCard = allCards.find(card => card.text().includes('Task 1'));
    
    const deleteBtn = firstCard!.findAll('button').find(btn => 
      btn.attributes('title') === 'Delete'
    );
    
    await deleteBtn!.trigger('click');

    expect(wrapper.emitted('delete')).toBeTruthy();
    const deleteEvent = wrapper.emitted('delete') as any[];
    expect(deleteEvent[0][0]).toBe(1);
  });

  it('renders all task titles correctly', () => {
    const wrapper = mount(KanbanBoard, {
      props: { tasks: mockTasks },
    });

    mockTasks.forEach(task => {
      expect(wrapper.text()).toContain(task.title);
    });
  });

  it('renders delete button for all tasks', () => {
    const wrapper = mount(KanbanBoard, {
      props: { tasks: mockTasks },
    });

    const allCards = wrapper.findAll('.card');
    expect(allCards).toHaveLength(4);

    allCards.forEach(card => {
      const deleteBtn = card.findAll('button').find(btn => 
        btn.attributes('title') === 'Delete'
      );
      expect(deleteBtn).toBeTruthy();
      expect(deleteBtn?.classes()).toContain('danger');
    });
  });

  it('renders status dropdown for all tasks', () => {
    const wrapper = mount(KanbanBoard, {
      props: { tasks: mockTasks },
    });

    const allCards = wrapper.findAll('.card');
    
    allCards.forEach(card => {
      const select = card.find('select');
      expect(select.exists()).toBe(true);
      
      const options = select.findAll('option');
      expect(options).toHaveLength(3);
      expect(options[0].text()).toBe('To-Do');
      expect(options[1].text()).toBe('Doing');
      expect(options[2].text()).toBe('Done');
    });
  });

  it('displays empty columns when no tasks are provided', () => {
    const wrapper = mount(KanbanBoard, {
      props: { tasks: [] },
    });

    const columns = wrapper.findAll('.col');
    expect(columns).toHaveLength(3);

    columns.forEach(col => {
      expect(col.find('small').text()).toBe('0');
      expect(col.findAll('.card')).toHaveLength(0);
    });
  });

  it('handles multiple tasks in same column', () => {
    const multipleTodoTasks: TaskItem[] = [
      { id: 1, title: 'Task 1', status: 'todo' },
      { id: 2, title: 'Task 2', status: 'todo' },
      { id: 3, title: 'Task 3', status: 'todo' },
    ];

    const wrapper = mount(KanbanBoard, {
      props: { tasks: multipleTodoTasks },
    });

    const columns = wrapper.findAll('.col');
    const todoColumn = columns[0];
    
    expect(todoColumn.find('small').text()).toBe('3');
    const cards = todoColumn.findAll('.card');
    expect(cards).toHaveLength(3);
  });

  it('preserves task data when moving between columns', async () => {
    const taskWithLongTitle: TaskItem[] = [
      { id: 1, title: 'This is a very long task title that should be preserved', status: 'todo' },
    ];

    const wrapper = mount(KanbanBoard, {
      props: { tasks: taskWithLongTitle },
    });

    const moveRightBtn = wrapper.findAll('button').find(btn => 
      btn.attributes('title') === 'Move right'
    );
    
    await moveRightBtn!.trigger('click');

    const updateEvent = wrapper.emitted('update') as any[];
    expect(updateEvent[0][0].title).toBe('This is a very long task title that should be preserved');
    expect(updateEvent[0][0].id).toBe(1);
  });

  it('status dropdown reflects current task status', () => {
    const wrapper = mount(KanbanBoard, {
      props: { tasks: mockTasks },
    });

    const columns = wrapper.findAll('.col');
    
    // Check todo column tasks
    const todoCards = columns[0].findAll('.card');
    todoCards.forEach(card => {
      const select = card.find('select');
      expect(select.element.value).toBe('todo');
    });

    // Check doing column tasks
    const doingCards = columns[1].findAll('.card');
    doingCards.forEach(card => {
      const select = card.find('select');
      expect(select.element.value).toBe('doing');
    });

    // Check done column tasks
    const doneCards = columns[2].findAll('.card');
    doneCards.forEach(card => {
      const select = card.find('select');
      expect(select.element.value).toBe('done');
    });
  });
});
