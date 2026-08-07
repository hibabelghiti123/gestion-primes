import api from "./axiosConfig";

export const getAllEvaluations = () => api.get("/evaluations");
export const createEvaluation = (evaluation) => api.post("/evaluations", evaluation);