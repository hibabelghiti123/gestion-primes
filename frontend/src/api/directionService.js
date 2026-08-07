import api from "./axiosConfig";

export const getAllDirections = () => api.get("/directions");
export const getDirectionById = (id) => api.get(`/directions/${id}`);
export const createDirection = (direction) => api.post("/directions", direction);
export const updateDirection = (id, direction) => api.put(`/directions/${id}`, direction);
export const deleteDirection = (id) => api.delete(`/directions/${id}`);