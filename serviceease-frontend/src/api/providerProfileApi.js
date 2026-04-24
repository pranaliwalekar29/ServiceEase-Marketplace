import api from "./axios";

export const getMyProviderProfile = () => {
  return api.get("/provider-profile/me");
};

export const createProviderProfile = (bio) => {
  return api.post("/provider-profile", { bio });
};
