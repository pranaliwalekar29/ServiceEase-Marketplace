import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getActiveCategories, createService, getMyServices } from "../../api/serviceApi";
import { getMyProviderProfile } from "../../api/providerProfileApi";

const ProviderServices = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    serviceName: "",
    categoryId: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [catRes, svcRes, profileRes] = await Promise.all([
        getActiveCategories(),
        getMyServices(),
        getMyProviderProfile(),
      ]);
      setCategories(catRes.data);
      setServices(svcRes.data);
      setProfile(profileRes.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createService({
        serviceName: form.serviceName,
        categoryId: Number(form.categoryId),
        price: Number(form.price),
        description: form.description,
      });
      setForm({ serviceName: "", categoryId: "", price: "", description: "" });
      loadInitialData();
    } catch (err) {
      setError("Failed to create service");
    }
  };

  const notApproved = profile && !profile.approved;

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Services</h2>
        <p className="text-gray-600 text-sm">Create and manage the services you offer. Update pricing, descriptions, and availability.</p>
      </div>

      {/* Approval gate */}
      {notApproved && (
        <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-orange-700 font-medium">⏳ Your profile is pending approval. You cannot create services yet.</p>
        </div>
      )}

      {/* Create service form */}
      {!notApproved && (
        <form
          onSubmit={handleCreate}
          className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl mb-8 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Service</h3>

          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"><p className="text-red-700 text-sm font-medium">{error}</p></div>}

          <input
            name="serviceName"
            placeholder="Service Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 mb-4"
            value={form.serviceName}
            onChange={handleChange}
            required
          />

          <select
            name="categoryId"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 mb-4"
            value={form.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            name="price"
            type="number"
            placeholder="Price"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 mb-4"
            value={form.price}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Service Description"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 mb-4 resize-none"
            value={form.description}
            onChange={handleChange}
          />

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-sm hover:shadow-md">
            Create Service
          </button>
        </form>
      )}

      {/* Services list */}
      <div className="space-y-4">
        {services.map((s) => (
          <div key={s.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <p className="font-semibold text-gray-800">{s.serviceName}</p>
            <p className="text-sm text-gray-500 mt-1">
              {s.category?.name} • ₹{s.price}
            </p>
            <p className="text-sm text-gray-600 mt-3">{s.description}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ProviderServices;
