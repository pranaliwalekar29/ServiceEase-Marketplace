import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const CustomerProfile = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      const res = await api.get("/bookings/customer");
      setBookings(res.data);
    };
    loadBookings();
  }, []);

  const total = bookings.length;
  const completed = bookings.filter(b => b.status === "COMPLETED").length;
  const active = bookings.filter(
    b => b.status === "REQUESTED" || b.status === "ACCEPTED"
  ).length;

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h2>
        <p className="text-gray-600 text-sm">View your account information, booking statistics, and activity summary.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Account Information</h3>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Name:</span>
              <p className="text-gray-600 mt-1">{user.name}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Email:</span>
              <p className="text-gray-600 mt-1">{user.email}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Role:</span>
              <p className="mt-1">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Customer
                </span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default CustomerProfile;
