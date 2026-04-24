import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await api.get("/bookings/provider");
      // Sort by date descending and take first 5
      const recentBookings = res.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setBookings(recentBookings);
    } catch (err) {
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "REQUESTED":
        return "bg-yellow-100 text-yellow-800";
      case "ACCEPTED":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome, {user?.name}
        </h2>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <p className="text-gray-700 text-sm">
            Incoming booking requests will appear below. Manage and respond to customer service requests in real-time.
          </p>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
          {loading ? (
            <p className="text-gray-600 text-sm">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="text-gray-600 text-sm">No bookings yet. Once customers book your services, they'll appear here.</p>
          ) : (
            <div className="space-y-3">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-start justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-semibold text-gray-900">{booking.service?.serviceName}</p>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Customer: <span className="font-medium">{booking.customer?.name}</span></p>
                    <p className="text-sm text-gray-600">
                      Date: <span className="font-medium">{new Date(booking.bookingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </p>
                    <p className="text-sm text-gray-600">Slot: <span className="font-medium">{booking.slot?.timeRange || `Slot ${booking.slot?.id}`}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600">₹{booking.service?.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProviderDashboard;
