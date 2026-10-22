import api from "./api";

export const createBooking = async (eventId, tickets) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/bookings",
    {
      eventId,
      tickets,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyBookings = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/bookings/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};