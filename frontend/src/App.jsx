import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";

import AdminDashboard from "./admin/AdminDashboard";
import AddEvent from "./admin/AddEvent";
import ManageEvents from "./admin/ManageEvents";
import EditEvent from "./admin/EditEvent";
import AdminBookings from "./admin/AdminBookings";
import AdminUsers from "./admin/AdminUsers";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected User Pages */}
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Pages */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-event"
          element={
            <AdminRoute>
              <AddEvent />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <AdminRoute>
              <ManageEvents />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/edit-event/:id"
          element={
            <AdminRoute>
              <EditEvent />
            </AdminRoute>
          }
        />
        <Route
  path="/admin/bookings"
  element={
    <AdminRoute>
      <AdminBookings />
    </AdminRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminRoute>
      <AdminUsers />
    </AdminRoute>
  }
/>

      </Routes>
    </>
  );
}

export default App;