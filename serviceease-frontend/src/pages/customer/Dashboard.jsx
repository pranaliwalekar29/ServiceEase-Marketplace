import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await api.get("/bookings/customer");
      const bookings = res.data;
      setStats({
        total: bookings.length,
        completed: bookings.filter((b) => b.status === "COMPLETED").length,
        pending: bookings.filter(
          (b) => b.status === "REQUESTED" || b.status === "ACCEPTED"
        ).length,
      });
      // Get last 3 bookings
      setRecentBookings(
        bookings
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3)
      );
    } catch (err) {
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "REQUESTED":
        return "text-yellow-600 bg-yellow-50";
      case "ACCEPTED":
        return "text-blue-600 bg-blue-50";
      case "COMPLETED":
        return "text-green-600 bg-green-50";
      case "REJECTED":
      case "CANCELLED":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Hello, {user?.name}
        </h2>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <p className="text-gray-700 text-sm">
            Welcome to ServiceEase! Discover professionals offering a variety of services. Book appointments, track your requests, and manage your reservations all in one place.
          </p>
        </div>

        {/* Quick Action - Browse Services */}
        <a
          href="/customer/services"
          className="block bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 border border-indigo-200 rounded-lg p-6 text-white shadow-md transition transform hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">🔍 Browse Services</h3>
              <p className="text-indigo-100 text-sm">Explore available services from verified providers and book your appointment</p>
            </div>
            <div className="text-3xl">→</div>
          </div>
        </a>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">Total Bookings</p>
            <p className="text-3xl font-bold text-blue-900 mt-2">{stats.total}</p>
            <p className="text-xs text-blue-700 mt-2">All time bookings</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <p className="text-sm font-medium text-green-600 uppercase tracking-wide">Completed</p>
            <p className="text-3xl font-bold text-green-900 mt-2">{stats.completed}</p>
            <p className="text-xs text-green-700 mt-2">Services completed</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <p className="text-sm font-medium text-orange-600 uppercase tracking-wide">Pending</p>
            <p className="text-3xl font-bold text-orange-900 mt-2">{stats.pending}</p>
            <p className="text-xs text-orange-700 mt-2">Awaiting confirmation</p>
          </div>
        </div>

        {/* Recent Bookings */}
        {!loading && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
              <a href="/customer/bookings" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                View All →
              </a>
            </div>

            {recentBookings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You haven't booked any services yet.</p>
                <a
                  href="/customer/browse"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition"
                >
                  Browse Services
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-start justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-gray-900">{booking.service?.serviceName}</p>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Provider: <span className="font-medium">{booking.provider?.user?.name}</span></p>
                      <p className="text-sm text-gray-600">
                        Date: <span className="font-medium">{new Date(booking.bookingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-indigo-600">₹{booking.service?.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Getting Started Guide */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
          <h3 className="font-semibold text-indigo-900 mb-3">📚 How to Get Started</h3>
          <ul className="space-y-2 text-indigo-700 text-sm">
            <li>✓ Browse and filter services by category and price</li>
            <li>✓ View provider profiles and customer reviews</li>
            <li>✓ Book available time slots instantly</li>
            <li>✓ Track your bookings and receive updates</li>
            <li>✓ Rate services after completion</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
