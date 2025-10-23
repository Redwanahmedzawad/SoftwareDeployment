// src/services/tasks.ts
import { api } from "../lib/api";
/** Map inbound DTO to UI Task */
export function normalizeTask(dto) {
    const id = dto.id ?? dto.Id ?? 0;
    const title = (dto.title ?? dto.Title ?? "").toString();
    const rawStatus = (dto.status ?? dto.Status ?? "todo").toString().toLowerCase();
    const status = (["todo", "doing", "done"].includes(rawStatus) ? rawStatus : "todo");
    const priority = dto.priority ?? "medium";
    return { id, title, status, priority };
}
/** GET /api/tasks */
export async function getTasks() {
    const res = await api.get("/tasks").catch((e) => {
        const msg = e?.response?.data?.message || e?.response?.data || e.message;
        throw new Error(`getTasks failed: ${msg}`);
    });
    const data = res.data;
    const list = Array.isArray(data) ? data : (data?.items ?? []);
    return list.map(normalizeTask);
}
/** POST /api/tasks */
export async function createTask(payload) {
    const body = {
        title: payload.title, Title: payload.title,
        status: payload.status, Status: payload.status,
        priority: payload.priority ?? "medium",
    };
    const res = await api.post("/tasks", body).catch((e) => {
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
export async function updateTask(id, payload) {
    // If backend wants capitalized values, flip this map:
    // const statusOut: Record<Status,string> = { todo:'Todo', doing:'Doing', done:'Done' }
    const body = {
        Id: id, // REQUIRED by your backend
        Title: payload.title,
        Status: payload.status, // or: statusOut[payload.status]
    };
    const res = await api.put(`/tasks/${id}`, body);
    if (res.status === 204 || res.data == null) {
        return { id, title: payload.title, status: payload.status, priority: payload.priority ?? 'medium' };
    }
    return res.data;
}
/** DELETE /api/tasks/{id} */
export async function deleteTask(id) {
    await api.delete(`/tasks/${id}`).catch((e) => {
        const msg = e?.response?.data?.message || e?.response?.data || e.message;
        throw new Error(`deleteTask failed: ${msg}`);
    });
}
