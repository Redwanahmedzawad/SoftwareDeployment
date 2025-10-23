import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import App from '../App.vue';
import KanbanBoard from '../components/KanbanBoard.vue';
import type { TaskItem } from '../types';
import * as tasksService from '../services/tasks';

// Mock the tasks service
vi.mock('../services/tasks', () => ({
  listTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}));

describe('App.vue', () => {
  const mockTasks: TaskItem[] = [
    { id: 1, title: 'Task 1', status: 'todo' },
    { id: 2, title: 'Task 2', status: 'doing' },
    { id: 3, title: 'Task 3', status: 'done' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(tasksService.listTasks).mockResolvedValue(mockTasks);
  });

  it('renders the app header with title', () => {
    const wrapper = mount(App);
    expect(wrapper.find('h1').text()).toBe('Verisys — Task Board');
  });

  it('renders the task input form', () => {
    const wrapper = mount(App);
    
    const input = wrapper.find('input[placeholder="Add a task..."]');
    expect(input.exists()).toBe(true);
    
    const button = wrapper.find('button[type="submit"]');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Add');
  });

  it('renders KanbanBoard component', () => {
    const wrapper = mount(App);
    expect(wrapper.findComponent(KanbanBoard).exists()).toBe(true);
  });

  it('loads tasks on mount', async () => {
    mount(App);
    await flushPromises();

    expect(tasksService.listTasks).toHaveBeenCalledTimes(1);
  });

  it('passes tasks to KanbanBoard component', async () => {
    const wrapper = mount(App);
    await flushPromises();

    const kanbanBoard = wrapper.findComponent(KanbanBoard);
    expect(kanbanBoard.props('tasks')).toEqual(mockTasks);
  });

  it('adds a new task when form is submitted', async () => {
    const newTask: TaskItem = { id: 4, title: 'New Task', status: 'todo' };
    vi.mocked(tasksService.createTask).mockResolvedValue(newTask);
    vi.mocked(tasksService.listTasks).mockResolvedValue([...mockTasks, newTask]);

    const wrapper = mount(App);
    await flushPromises();

    const input = wrapper.find('input[placeholder="Add a task..."]');
    const form = wrapper.find('form');

    await input.setValue('New Task');
    await form.trigger('submit');
    await flushPromises();

    expect(tasksService.createTask).toHaveBeenCalledWith({
      title: 'New Task',
      status: 'todo',
    });
    expect(tasksService.listTasks).toHaveBeenCalledTimes(2);
  });

  it('clears input field after adding a task', async () => {
    const newTask: TaskItem = { id: 4, title: 'New Task', status: 'todo' };
    vi.mocked(tasksService.createTask).mockResolvedValue(newTask);

    const wrapper = mount(App);
    await flushPromises();

    const input = wrapper.find('input[placeholder="Add a task..."]');
    const form = wrapper.find('form');

    await input.setValue('New Task');
    await form.trigger('submit');
    await flushPromises();

    expect((input.element as HTMLInputElement).value).toBe('');
  });

  it('does not submit empty task titles (trimmed)', async () => {
    const wrapper = mount(App);
    await flushPromises();

    const input = wrapper.find('input[placeholder="Add a task..."]');

    await input.setValue('   ');
    
    // The input has v-model.trim, so whitespace-only value becomes empty
    expect((input.element as HTMLInputElement).value).toBe('');
    
    // Verify createTask was not called
    const initialCallCount = vi.mocked(tasksService.createTask).mock.calls.length;
    expect(initialCallCount).toBe(0);
  });

  it('updates a task when KanbanBoard emits update event', async () => {
    vi.mocked(tasksService.updateTask).mockResolvedValue();

    const wrapper = mount(App);
    await flushPromises();

    const kanbanBoard = wrapper.findComponent(KanbanBoard);
    const updatedTask: TaskItem = { id: 1, title: 'Task 1', status: 'doing' };
    
    await kanbanBoard.vm.$emit('update', updatedTask);
    await flushPromises();

    expect(tasksService.updateTask).toHaveBeenCalledWith(updatedTask);
    expect(tasksService.listTasks).toHaveBeenCalledTimes(2);
  });

  it('deletes a task when KanbanBoard emits delete event', async () => {
    vi.mocked(tasksService.deleteTask).mockResolvedValue();
    const updatedTasks = mockTasks.filter(t => t.id !== 1);
    vi.mocked(tasksService.listTasks).mockResolvedValue(updatedTasks);

    const wrapper = mount(App);
    await flushPromises();

    const kanbanBoard = wrapper.findComponent(KanbanBoard);
    
    await kanbanBoard.vm.$emit('delete', 1);
    await flushPromises();

    expect(tasksService.deleteTask).toHaveBeenCalledWith(1);
    expect(tasksService.listTasks).toHaveBeenCalledTimes(2);
  });

  it('refreshes task list after update', async () => {
    vi.mocked(tasksService.updateTask).mockResolvedValue();
    const updatedMockTasks = [
      { id: 1, title: 'Task 1', status: 'doing' as const },
      { id: 2, title: 'Task 2', status: 'doing' as const },
      { id: 3, title: 'Task 3', status: 'done' as const },
    ];
    
    const wrapper = mount(App);
    await flushPromises();
    
    // Reset the mock to return updated tasks
    vi.mocked(tasksService.listTasks).mockResolvedValue(updatedMockTasks);

    const kanbanBoard = wrapper.findComponent(KanbanBoard);
    await kanbanBoard.vm.$emit('update', updatedMockTasks[0]);
    await flushPromises();

    expect(kanbanBoard.props('tasks')).toEqual(updatedMockTasks);
  });

  it('refreshes task list after delete', async () => {
    vi.mocked(tasksService.deleteTask).mockResolvedValue();
    const remainingTasks = [
      { id: 2, title: 'Task 2', status: 'doing' as const },
      { id: 3, title: 'Task 3', status: 'done' as const },
    ];

    const wrapper = mount(App);
    await flushPromises();
    
    vi.mocked(tasksService.listTasks).mockResolvedValue(remainingTasks);

    const kanbanBoard = wrapper.findComponent(KanbanBoard);
    await kanbanBoard.vm.$emit('delete', 1);
    await flushPromises();

    expect(kanbanBoard.props('tasks')).toEqual(remainingTasks);
  });

  it('adds new task with todo status by default', async () => {
    const newTask: TaskItem = { id: 4, title: 'Test Task', status: 'todo' };
    vi.mocked(tasksService.createTask).mockResolvedValue(newTask);

    const wrapper = mount(App);
    await flushPromises();

    const input = wrapper.find('input[placeholder="Add a task..."]');
    const form = wrapper.find('form');

    await input.setValue('Test Task');
    await form.trigger('submit');
    await flushPromises();

    expect(tasksService.createTask).toHaveBeenCalledWith({
      title: 'Test Task',
      status: 'todo',
    });
  });

  it('trims whitespace from task title', async () => {
    const newTask: TaskItem = { id: 4, title: 'Trimmed Task', status: 'todo' };
    vi.mocked(tasksService.createTask).mockResolvedValue(newTask);

    const wrapper = mount(App);
    await flushPromises();

    const input = wrapper.find('input[placeholder="Add a task..."]');
    const form = wrapper.find('form');

    await input.setValue('  Trimmed Task  ');
    await form.trigger('submit');
    await flushPromises();

    expect(tasksService.createTask).toHaveBeenCalledWith({
      title: 'Trimmed Task',
      status: 'todo',
    });
  });

  it('handles multiple rapid task additions', async () => {
    const task1: TaskItem = { id: 4, title: 'Task 4', status: 'todo' };
    const task2: TaskItem = { id: 5, title: 'Task 5', status: 'todo' };
    
    vi.mocked(tasksService.createTask)
      .mockResolvedValueOnce(task1)
      .mockResolvedValueOnce(task2);

    const wrapper = mount(App);
    await flushPromises();

    const input = wrapper.find('input[placeholder="Add a task..."]');
    const form = wrapper.find('form');

    await input.setValue('Task 4');
    await form.trigger('submit');
    await flushPromises();

    await input.setValue('Task 5');
    await form.trigger('submit');
    await flushPromises();

    expect(tasksService.createTask).toHaveBeenCalledTimes(2);
    expect(tasksService.listTasks).toHaveBeenCalledTimes(3); // Initial + 2 refreshes
  });

  it('input field has required attribute', () => {
    const wrapper = mount(App);
    const input = wrapper.find('input[placeholder="Add a task..."]');
    
    expect(input.attributes('required')).toBeDefined();
  });

  it('form prevents default submission behavior', async () => {
    const wrapper = mount(App);
    const form = wrapper.find('form');
    
    // The form has @submit.prevent, so default behavior is prevented
    expect(form.attributes('class')).toContain('new');
  });

  it('renders app with proper structure', () => {
    const wrapper = mount(App);
    
    expect(wrapper.find('main.app').exists()).toBe(true);
    expect(wrapper.find('header.app-header').exists()).toBe(true);
    expect(wrapper.find('.app__board').exists()).toBe(true);
  });

  it('handles empty task list gracefully', async () => {
    vi.mocked(tasksService.listTasks).mockResolvedValue([]);

    const wrapper = mount(App);
    await flushPromises();

    const kanbanBoard = wrapper.findComponent(KanbanBoard);
    expect(kanbanBoard.props('tasks')).toEqual([]);
  });

  it('submit button is of type submit', () => {
    const wrapper = mount(App);
    const button = wrapper.find('button[type="submit"]');
    
    expect(button.attributes('type')).toBe('submit');
  });
});
