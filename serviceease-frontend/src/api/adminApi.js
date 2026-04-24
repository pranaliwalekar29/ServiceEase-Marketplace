import api from "./axios";

// export const getAllProviders = () => api.get("/admin/providers");

export const getPendingProviders = () =>
  api.get("/admin/providers/pending");

// Adjust paths if your backend differs:
export const approveProvider = (providerId) =>
api.put(`/admin/providers/${providerId}/approve`);

export const rejectProvider = (providerId, reason) =>
api.put(`/admin/providers/${providerId}/reject`, { reason });

export const getCategories = () =>
api.get("/Categories/active");

export const createCategory = (data) =>
api.post("/Categories", data);