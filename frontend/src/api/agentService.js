import api from "./axiosConfig";

export const getAllAgents = () => api.get("/agents");
export const getAgentById = (id) => api.get(`/agents/${id}`);
export const createAgent = (agent) => api.post("/agents", agent);
export const updateAgent = (id, agent) => api.put(`/agents/${id}`, agent);
export const deleteAgent = (id) => api.delete(`/agents/${id}`);