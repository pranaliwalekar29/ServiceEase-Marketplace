import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Modal from "../../components/common/Modal";
import {
  getPendingProviders,
  approveProvider,
  rejectProvider
} from "../../api/adminApi";

const PendingProviders = () => {
  const [providers, setProviders] = useState([]);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load providers
  const loadProviders = async () => {
    try {
      const res = await getPendingProviders();
      setProviders(res.data);
    } catch (err) {
      console.error("Error loading providers:", err);
      setMessage("Error loading providers");
    }
  };

  // Load providers on component mount
  useEffect(() => {
    loadProviders();
  }, []);

  const handleApprove = async (id) => {
    try {
      setLoading(true);
      await approveProvider(id);
      setMessage("Provider approved successfully!");
      setTimeout(() => setMessage(""), 3000);
      loadProviders();
    } catch (err) {
      console.error("Error approving provider:", err);
      setMessage("Error approving provider");
    } finally {
      setLoading(false);
    }
  };

  const openReject = (id) => {
    setSelectedId(id);
    setReason("");
    setOpen(true);
  };

  const handleReject = async () => {
    if (!reason.trim()) return;
    try {
      setLoading(true);
      await rejectProvider(selectedId, reason);
      setMessage("Provider rejected successfully!");
      setTimeout(() => setMessage(""), 3000);
      setOpen(false);
      loadProviders();
    } catch (err) {
      console.error("Error rejecting provider:", err);
      setMessage("Error rejecting provider");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pending Providers</h2>
        <p className="text-gray-600 text-sm">Review and approve new provider registrations. Verify credentials before they can offer services.</p>
      </div>
      {/* ===== Pending Providers ===== */}

      {message && (
        <div className={`mb-4 px-4 py-3 rounded-lg font-semibold border ${message.includes("Error") ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"}`}>
          {message}
        </div>
      )}

      {providers.length === 0 && (
        <p className="text-gray-600 text-center py-8">No pending providers.</p>
      )}

      <div className="grid grid-cols-1 gap-4">
        {providers.map((p) => (
          <div
            key={p.providerId}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between items-start gap-4"
          >
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-lg">{p.user?.name}</p>
              <p className="text-sm text-gray-600 mb-3">{p.user?.email}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{p.bio}</p>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => handleApprove(p.providerId)}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Approve"}
              </button>
              <button
                onClick={() => openReject(p.providerId)}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Reject Modal ===== */}
      <Modal open={open} title="Reject Provider" onClose={() => setOpen(false)}>
        <textarea
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 mb-4"
          placeholder="Reason for rejection"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows="4"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            disabled={loading}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg transition duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleReject}
            disabled={!reason.trim() || loading}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Rejecting..." : "Confirm Reject"}
          </button>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default PendingProviders;
