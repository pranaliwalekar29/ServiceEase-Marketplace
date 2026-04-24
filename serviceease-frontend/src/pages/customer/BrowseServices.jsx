import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getActiveServices, bookService } from "../../api/customerServiceApi";
import Modal from "../../components/common/Modal";
import { useNavigate, useSearchParams } from "react-router-dom";

const BrowseServices = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /* ---------------- Load services ---------------- */
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const res = await getActiveServices();
    setServices(res.data);
  };

  /* --------- Auto open modal via serviceId -------- */
  useEffect(() => {
    const serviceId = searchParams.get("serviceId");

    if (serviceId && services.length > 0) {
      const service = services.find(
        (s) => s.id === Number(serviceId)
      );

      if (service) {
        setSelectedService(service);
        setOpen(true);
      }
    }
  }, [services, searchParams]);

  /* ---------------- Booking ---------------- */
  const handleBook = async () => {
    if (!selectedService) return;

    setError("");
    try {
      await bookService({
        serviceId: selectedService.id,
        date,
      });

      setOpen(false);
      setDate("");
      alert("Booking request sent to provider");
    } catch {
      setError("Unable to send booking request");
    }
  };

  /* ---------------- Filter ---------------- */
  const filteredServices = services.filter((s) =>
    `${s.serviceName} ${s.category?.name || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Browse Services
        </h2>
        <p className="text-sm text-gray-600">
          Choose a service and request a booking on your preferred date.
        </p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search services or categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md mb-6 border rounded px-3 py-2"
      />

      {filteredServices.length === 0 && (
        <p className="text-gray-600">No services found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((s) => (
          <div
            key={s.id}
            className="bg-white border rounded-lg p-4 hover:shadow-md transition"
          >
            <p className="font-semibold text-gray-800">{s.serviceName}</p>
            <p className="text-sm text-gray-500 mt-1">
              {s.category?.name} • ₹{s.price}
            </p>
            <p className="text-sm text-gray-600 mt-3 mb-4">
              {s.description}
            </p>

            <button
              onClick={() => {
                setSelectedService(s);
                setOpen(true);
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition"
            >
              Request Booking
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      <Modal
        open={open}
        title="Request Booking"
        onClose={() => {
          setOpen(false);
          setDate("");
          setError("");
        }}
      >
        <p className="text-sm text-gray-600 mb-4">
          Select your preferred date. The provider will confirm availability.
        </p>

        {error && (
          <p className="text-red-600 text-sm mb-2">{error}</p>
        )}

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />

        <button
          onClick={handleBook}
          disabled={!date}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded transition"
        >
          Confirm Request
        </button>

        {selectedService?.provider?.id && (
  <p
    onClick={() => navigate(`/providers/${selectedService.provider.id}`)}
    className="mt-4 text-center text-indigo-600 text-sm underline cursor-pointer hover:text-indigo-800"
  >
    View Provider Profile
  </p>
)}
      </Modal>
    </DashboardLayout>
  );
};

export default BrowseServices;
