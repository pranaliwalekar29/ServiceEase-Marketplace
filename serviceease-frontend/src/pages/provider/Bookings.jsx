import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getProviderBookings,
  acceptBooking,
  rejectBooking,
  completeBooking,
} from "../../api/providerBookingApi";
import Modal from "../../components/common/Modal";

const ProviderBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await getProviderBookings();
      setBookings(res.data);
      setMessage("");
    } catch (err) {
      setMessage("Error loading bookings");
    }
  };

  const handleAccept = async (id) => {
    try {
      setLoading(true);
      await acceptBooking(id);
      setMessage("Booking accepted successfully");
      loadBookings();
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!reason.trim()) return;
    try {
      setLoading(true);
      await rejectBooking(selectedId, reason);
      setOpen(false);
      setReason("");
      setMessage("Booking rejected successfully");
      loadBookings();
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id) => {
    try {
      setLoading(true);
      await completeBooking(id);
      setMessage("Booking marked as completed");
      loadBookings();
    } finally {
      setLoading(false);
    }
  };

  // ---------- DERIVED DATA ----------
  const today = new Date().toISOString().split("T")[0];

  const requested = bookings.filter(b => b.status === "REQUESTED");
  const accepted = bookings.filter(b => b.status === "ACCEPTED");

  const todayRequests = requested.filter(b => b.bookingDate === today);
  const acceptedToday = accepted.filter(b => b.bookingDate === today);

  // ---------- UI ----------
  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Bookings</h2>
        <p className="text-gray-600 text-sm">
          Review requests, manage accepted work, and complete services.
        </p>
      </div>

      {/* SUMMARY BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard label="Pending Requests" value={requested.length} />
        <SummaryCard label="Today's Requests" value={todayRequests.length} />
        <SummaryCard label="Accepted Today" value={acceptedToday.length} />
      </div>

      {message && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg font-medium">
          {message}
        </div>
      )}

      {/* TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT — NEEDS ACTION */}
        <section>
          <h3 className="font-semibold text-gray-900 mb-3">
            Needs Action
          </h3>

          {requested.length === 0 && (
            <p className="text-sm text-gray-500">No pending requests.</p>
          )}

          <div className="space-y-4">
            {requested.map((b) => (
              <div key={b.bookingId} className="bg-white border rounded-lg p-4">
                <p className="font-semibold">{b.serviceName}</p>
                <p className="text-sm text-gray-500">
                  Customer: {b.providerName}
                </p>
                <p className="text-sm mt-2">
                  {b.bookingDate}
                  {b.bookingDate === today && (
                    <span className="ml-2 text-xs text-red-600 font-semibold">
                      Today
                    </span>
                  )}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleAccept(b.bookingId)}
                    className="px-4 py-2 bg-green-50 text-green-600 rounded-lg font-medium"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(b.bookingId);
                      setOpen(true);
                    }}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT — ACCEPTED */}
        <section>
          <h3 className="font-semibold text-gray-900 mb-3">
            Accepted & Ongoing
          </h3>

          {accepted.length === 0 && (
            <p className="text-sm text-gray-500">No accepted bookings.</p>
          )}

          <div className="space-y-4">
            {accepted.map((b) => (
              <div key={b.bookingId} className="bg-white border rounded-lg p-4">
                <p className="font-semibold">{b.serviceName}</p>
                <p className="text-sm text-gray-500">
                  Customer: {b.providerName}
                </p>
                <p className="text-sm mt-2">{b.bookingDate}</p>

                <button
                  onClick={() => handleComplete(b.bookingId)}
                  className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium"
                >
                  Mark Completed
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* REJECT MODAL */}
      <Modal open={open} title="Reject Booking" onClose={() => setOpen(false)}>
        <textarea
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Reason for rejection"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button
          onClick={handleReject}
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold"
        >
          Confirm Reject
        </button>
      </Modal>
    </DashboardLayout>
  );
};

const SummaryCard = ({ label, value }) => (
  <div className="bg-white border rounded-lg p-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default ProviderBookings;
