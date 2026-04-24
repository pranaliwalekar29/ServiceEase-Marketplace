import api from "./axios";

export const addAvailability = (data) =>
  api.post("/availability", data);

export const getAvailability = (date, serviceId) =>
  api.get("/availability", {
    params: { date, serviceId },
  });
