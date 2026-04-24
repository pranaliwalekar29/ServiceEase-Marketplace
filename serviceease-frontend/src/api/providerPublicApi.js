import api from "./axios";

export const getProviderPublicProfile = (providerId) =>
  api.get(`/providers/${providerId}/public`);
