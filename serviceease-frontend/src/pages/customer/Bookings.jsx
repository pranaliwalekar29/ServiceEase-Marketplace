import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getCustomerBookings,
  cancelBooking,
} from "../../api/bookingApi";

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const res = await getCustomerBookings();
    setBookings(res.data);
  };

  const handleCancel = async (id) => {
    await cancelBooking(id);
    loadBookings();
  };

  const statusColor = (status) => {
    switch (status) {
      case "REQUESTED":
        return "text-yellow-600";
      case "ACCEPTED":
        return "text-indigo-600";
      case "COMPLETED":
        return "text-green-600";
      case "REJECTED":
      case "CANCELLED":
        return "text-red-500";
      default:
        return "text-gray-600";
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Bookings</h2>
        <p className="text-gray-600 text-sm">View and manage all your service bookings. Check status, cancel requests, or contact providers.</p>
      </div>

      {bookings.length === 0 && (
        <p className="text-gray-600">No bookings yet.</p>
      )}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.bookingId}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 flex justify-between items-start"
          >
            <div>
              <p className="font-semibold text-gray-800">{b.serviceName}</p>
              <p className="text-sm text-gray-500 mt-1">
                Provider: {b.providerName}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {b.bookingDate} • {b.timeSlot}
              </p>
              <p className={`text-sm font-semibold mt-2 ${statusColor(b.status)}`}>
                {b.status}
              </p>
            </div>

            {/* Cancel allowed only if not completed/rejected */}
            {(b.status === "REQUESTED" || b.status === "ACCEPTED") && (
              <button
                onClick={() => handleCancel(b.bookingId)}
                className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-lg transition duration-200 text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default CustomerBookings;
