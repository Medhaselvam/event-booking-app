
import axios from "axios";

const api = axios.create({
  baseURL: "https://event-booking-app-arjq.onrender.com/api",
});

export default api;
