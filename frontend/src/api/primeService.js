import api from "./axiosConfig";

export const getAllPrimesRendement = () => api.get("/primes-rendement");
export const createPrimeRendement = (prime) => api.post("/primes-rendement", prime);
export const calculerPrimeFinale = (id, agentId) =>
  api.get(`/primes-rendement/${id}/calculer/${agentId}`);