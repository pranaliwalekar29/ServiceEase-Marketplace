import api from "./axios";

export const getActiveCategories = () =>
  api.get("/Categories/active");

export const createService = (data) =>
  api.post("/services", data);

export const getMyServices = () =>
  api.get("/services/me");
