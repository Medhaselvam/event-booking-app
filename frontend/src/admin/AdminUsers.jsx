import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.error(error);
        setError(
          error.response?.data?.message ||
            "Failed to load users"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-4">
          Manage Users
        </h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Users
            </h1>
            <p className="text-gray-600 mt-2">
              View registered EventBook accounts.
            </p>
          </div>

          <Link
            to="/admin"
            className="text-blue-600 font-semibold hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <p className="text-gray-600">Registered users</p>
          <p className="text-3xl font-bold mt-1">
            {users.length}
          </p>
        </div>

        {users.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            No registered users found.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Joined</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b last:border-0">
                    <td className="p-4 font-medium">
                      {user.name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {user.email}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          user.role === "admin"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="p-4 text-gray-600">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;