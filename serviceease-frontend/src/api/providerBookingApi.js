import api from "./axios";

export const getProviderBookings = () =>
  api.get("/bookings/provider");

export const acceptBooking = (bookingId) =>
  api.put(`/bookings/${bookingId}/accept`);

export const rejectBooking = (bookingId, reason) =>
  api.put(`/bookings/${bookingId}/reject`, null, {
    params: { reason },
  });

export const completeBooking = (bookingId) =>
  api.put(`/bookings/${bookingId}/complete`);