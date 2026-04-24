import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { addAvailability, getAvailability } from "../../api/availabilityApi";
import { getMyServices } from "../../api/serviceApi";

const ProviderAvailability = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [existing, setExisting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await getMyServices();
      setServices(res.data);
    } catch {
      setError("Failed to load services");
    }
  };

  const checkAvailability = async () => {
    if (!date || !selectedService) return;
    try {
      const res = await getAvailability(date, selectedService);
      setExisting(res.data.length > 0);
    } catch {
      setExisting(false);
    }
  };

  useEffect(() => {
    checkAvailability();
  }, [date, selectedService]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await addAvailability({
        serviceId: Number(selectedService),
        date,
      });
      setMessage("✓ Availability added for this date");
      setExisting(true);
    } catch {
      setError("Availability already exists or failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Set Availability
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Choose the days you are open to receive booking requests.
        </p>
      </div>

      <div className="bg-white border rounded-lg p-6 max-w-md shadow-sm">
        {/* Service */}
        <label className="block text-sm font-semibold mb-2">
          Service
        </label>
        <select
          value={selectedService}
          onChange={(e) => {
            setSelectedService(e.target.value);
            setDate("");
            setExisting(false);
          }}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        >
          <option value="">Select service</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.serviceName}
            </option>
          ))}
        </select>

        {/* Date */}
        {selectedService && (
          <>
            <label className="block text-sm font-semibold mb-2">
              Available Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
              required
            />
          </>
        )}

        {/* Status */}
        {existing && (
          <p className="text-green-600 text-sm mb-4">
            ✓ You are already available on this date
          </p>
        )}

        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        {message && (
          <p className="text-green-600 text-sm mb-4">{message}</p>
        )}

        {/* Action */}
        <button
          onClick={handleAdd}
          disabled={!date || !selectedService || existing || loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded transition"
        >
          {loading ? "Saving..." : "Mark Available"}
        </button>
      </div>
    </DashboardLayout>
  );
};

export default ProviderAvailability;
