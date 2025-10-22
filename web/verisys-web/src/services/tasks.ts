import { api } from "../lib/api";
import type { TaskItem, Status } from "../types";

export async function listTasks(): Promise<TaskItem[]> {
  const { data } = await api.get<TaskItem[]>("/tasks");
  return data;
}

export async function createTask(t: Omit<TaskItem, "id">): Promise<TaskItem> {
  const { data } = await api.post<TaskItem>("/tasks", t);
  return data;
}

export async function updateTask(t: TaskItem): Promise<void> {
  await api.put(`/tasks/${t.id}`, t);
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/tasks/${id}`);
}
