import { api } from "../lib/api";
export async function listTasks() {
    const { data } = await api.get("/tasks");
    return data;
}
export async function createTask(t) {
    const { data } = await api.post("/tasks", t);
    return data;
}
export async function updateTask(t) {
    await api.put(`/tasks/${t.id}`, t);
}
export async function deleteTask(id) {
    await api.delete(`/tasks/${id}`);
}
