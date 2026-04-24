import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../api/axios";

const ProviderPublicProfile = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [providerRes, servicesRes] = await Promise.all([
          api.get(`/providers/${providerId}`),
          api.get(`/services/active`)
        ]);

        setProvider(providerRes.data);

        // Filter only this provider's services
        const providerServices = servicesRes.data.filter(
          (s) => s.providerId === Number(providerId)
        );

        setServices(providerServices);
      } catch (err) {
        console.error("Error loading provider profile", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [providerId]);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center text-gray-600 py-10">Loading profile...</p>
      </DashboardLayout>
    );
  }

  if (!provider) {
    return (
      <DashboardLayout>
        <p className="text-center text-red-600 py-10">
          Provider not found
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Provider Info */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6 mb-6">
          <h2 className="text-3xl font-bold text-indigo-900">
            {provider.name}
          </h2>

          {provider.bio && (
            <p className="text-gray-700 mt-2">{provider.bio}</p>
          )}

          <div className="mt-4 flex gap-6 text-sm text-gray-700">
            <span className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span> 
              <span className="font-semibold">{provider.averageRating || "New"}</span>
            </span>
            <span className="text-indigo-600 font-semibold">{services.length} services</span>
          </div>
        </div>

        {/* Services */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Services Offered
          </h3>
          <p className="text-sm text-gray-600">
            Browse and select a service to make your booking
          </p>
        </div>

        {services.length === 0 && (
          <p className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">
            No services listed yet.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() =>
                navigate(`/browse-services?serviceId=${service.id}`)
              }
              className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg hover:border-indigo-400 transition duration-200 transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start">
                <p className="font-semibold text-gray-900 flex-1">
                  {service.serviceName}
                </p>
                <p className="text-indigo-600 font-bold text-lg ml-2">
                  ₹{service.price}
                </p>
              </div>

              <p className="text-sm text-gray-600 mt-2">
                {service.description}
              </p>

              <div className="flex items-center text-indigo-600 text-sm mt-4 font-medium group">
                <span>Book now</span>
                <span className="ml-1 group-hover:translate-x-1 transition">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProviderPublicProfile;
