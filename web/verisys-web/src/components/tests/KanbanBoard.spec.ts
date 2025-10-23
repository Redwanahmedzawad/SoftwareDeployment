import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import KanbanBoard from '../KanbanBoard.vue'
import type { TaskItem } from '../../types'

describe('KanbanBoard.vue', () => {
  const mockTasks: TaskItem[] = [
    { id: 1, title: 'Task 1', status: 'todo' },
    { id: 2, title: 'Task 2', status: 'doing' },
    { id: 3, title: 'Task 3', status: 'done' }
  ]

  // Helper function to create a new set of tasks
  const createTasks = (): TaskItem[] => [
    { id: 1, title: 'Task 1', status: 'todo' as const },
    { id: 2, title: 'Task 2', status: 'doing' as const },
    { id: 3, title: 'Task 3', status: 'done' as const }
  ]

  it('renders properly with tasks', () => {
    const wrapper = mount(KanbanBoard, {
      props: {
        tasks: mockTasks
      }
    })

    // Check if all columns are rendered
    expect(wrapper.findAll('.col')).toHaveLength(3)
    
    // Check if tasks are rendered in correct columns
    const todoTasks = wrapper.findAll('.col:nth-child(1) .card')
    const doingTasks = wrapper.findAll('.col:nth-child(2) .card')
    const doneTasks = wrapper.findAll('.col:nth-child(3) .card')

    expect(todoTasks).toHaveLength(1)
    expect(doingTasks).toHaveLength(1)
    expect(doneTasks).toHaveLength(1)
  })

  it('emits update event when moving task right', async () => {
    const wrapper = mount(KanbanBoard, {
      props: {
        tasks: mockTasks
      }
    })

    // Find and click the move right button for the todo task
    const moveRightButton = wrapper.findAll('.col:nth-child(1) .card button')[0]
    await moveRightButton.trigger('click')

    // Check if update event was emitted with correct data
    const updateEvent = wrapper.emitted('update')
    expect(updateEvent).toBeTruthy()
    expect(updateEvent![0][0]).toEqual({
      id: 1,
      title: 'Task 1',
      status: 'doing'
    })
  })

  it('emits update event when moving task left', async () => {
    const tasks = createTasks()
    const wrapper = mount(KanbanBoard, {
      props: {
        tasks
      }
    })

    // Find the doing task's move left button (it should be the first button)
    const doingTaskCard = wrapper.find('.col:nth-child(2) .card')
    const moveLeftButton = doingTaskCard.findAll('button')[0] // Get the first button (move left)
    await moveLeftButton.trigger('click')

    // Check if update event was emitted with correct data
    const updateEvent = wrapper.emitted('update')
    expect(updateEvent).toBeTruthy()
    const emittedTask = updateEvent![0][0] as TaskItem
    expect(emittedTask.id).toBe(2)
    expect(emittedTask.title).toBe('Task 2')
    expect(emittedTask.status).toBe('todo')
  })

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mount(KanbanBoard, {
      props: {
        tasks: mockTasks
      }
    })

    // Find and click delete button on any task
    const deleteButton = wrapper.find('.danger')
    await deleteButton.trigger('click')

    // Check if delete event was emitted with correct id
    const deleteEvent = wrapper.emitted('delete')
    expect(deleteEvent).toBeTruthy()
    expect(deleteEvent![0][0]).toBe(1) // First task's ID
  })

  it('updates task status when select value changes', async () => {
    const wrapper = mount(KanbanBoard, {
      props: {
        tasks: mockTasks
      }
    })

    // Find and change the select value
    const select = wrapper.find('select')
    await select.setValue('done')

    // Check if update event was emitted with correct data
    const updateEvent = wrapper.emitted('update')
    expect(updateEvent).toBeTruthy()
    expect(updateEvent![0][0]).toEqual({
      id: 1,
      title: 'Task 1',
      status: 'done'
    })
  })

  it('shows correct task count in column headers', async () => {
    const tasks = createTasks()
    const wrapper = mount(KanbanBoard, {
      props: {
        tasks
      }
    })

    // Wait for the component to update
    await wrapper.vm.$nextTick()

    const columns = wrapper.findAll('.col')
    expect(columns).toHaveLength(3)
    
    // Each column should contain exactly one task
    columns.forEach((column) => {
      const count = column.find('small')
      expect(count.text()).toBe('1')
    })
  })
})
