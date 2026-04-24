import api from "./axios";

export const getActiveServices = () =>
  api.get("/services/active");

export const getProviderAvailability = (date, providerId) =>
  api.get(`/availability`, {
    params: { date, providerId },
  });

export const bookService = (data) =>
  api.post("/bookings/request", data);
