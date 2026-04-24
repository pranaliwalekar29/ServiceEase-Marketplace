import api from "./axios";

export const getCustomerBookings = () =>
  api.get("/bookings/customer");

export const cancelBooking = (bookingId) =>
  api.put(`/bookings/${bookingId}/cancel`);
