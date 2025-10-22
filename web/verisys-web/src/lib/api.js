import axios from "axios";
/**
 * In dev, Vite proxy handles /api to the backend.
 * In prod, the app is served by the backend on the same origin.
 * So we can safely use a relative baseURL: "/api".
 */
export const api = axios.create({
    baseURL: "/api",
    timeout: 10000,
});
