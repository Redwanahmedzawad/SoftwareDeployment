// src/services/tasks.ts
import { api } from "../lib/api";

/** Domain types aligned to your backend */
export type Status = "todo" | "doing" | "done";
export type Priority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  status: Status;
  priority?: Priority;
}

/** DTOs your .NET API might return (casing may vary) */
export type TaskDto = {
  id?: number;
  Id?: number;
  title?: string;
  Title?: string;
  status?: Status | string;
  Status?: Status | string;
  priority?: Priority;
};

/** Map inbound DTO to UI Task */
export function normalizeTask(dto: TaskDto): Task {
  const id = dto.id ?? dto.Id ?? 0;
  const title = (dto.title ?? dto.Title ?? "").toString();
  const rawStatus = (dto.status ?? dto.Status ?? "todo").toString().toLowerCase();
  const status = (["todo", "doing", "done"].includes(rawStatus) ? rawStatus : "todo") as Status;
  const priority = dto.priority ?? "medium";
  return { id, title, status, priority };
}

/** GET /api/tasks */
export async function getTasks(): Promise<Task[]> {
  const res = await api.get("/tasks").catch((e: any) => {
    const msg = e?.response?.data?.message || e?.response?.data || e.message;
    throw new Error(`getTasks failed: ${msg}`);
  });
  const data = res.data;
  const list: TaskDto[] = Array.isArray(data) ? data : (data?.items ?? []);
  return list.map(normalizeTask);
}

/** POST /api/tasks */
export async function createTask(payload: { title: string; status: Status; priority?: Priority }): Promise<Task> {
  const body: any = {
    title: payload.title, Title: payload.title,
    status: payload.status, Status: payload.status,
    priority: payload.priority ?? "medium",
  };

  const res = await api.post("/tasks", body).catch((e: any) => {
    const msg = e?.response?.data?.message || e?.response?.data || e.message;
    throw new Error(`createTask failed: ${msg}`);
  });

  if (res.status === 204 || res.data == null) {
    // Some APIs return 204; synthesize result so UI stays consistent
    return { id: Date.now(), title: body.title, status: body.status, priority: body.priority };
  }
  return normalizeTask(res.data);
}

/** PUT or PATCH /api/tasks/{id} */
export async function updateTask(
  id: number,
  payload: { title: string; status: Status; priority?: Priority }
): Promise<Task> {
  // If backend wants capitalized values, flip this map:
  // const statusOut: Record<Status,string> = { todo:'Todo', doing:'Doing', done:'Done' }

  const body = {
    Id: id,                    // REQUIRED by your backend
    Title: payload.title,
    Status: payload.status,    // or: statusOut[payload.status]
  };

  const res = await api.put(`/tasks/${id}`, body);
  if (res.status === 204 || res.data == null) {
    return { id, title: payload.title, status: payload.status, priority: payload.priority ?? 'medium' };
  }
  return res.data as Task;
}



/** DELETE /api/tasks/{id} */
export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/tasks/${id}`).catch((e: any) => {
    const msg = e?.response?.data?.message || e?.response?.data || e.message;
    throw new Error(`deleteTask failed: ${msg}`);
  });
}
