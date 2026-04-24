import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getMyProviderProfile,
  createProviderProfile,
} from "../../api/providerProfileApi";
import { getMyServices } from "../../api/serviceApi";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

const ProviderProfile = () => {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [services, setServices] = useState([]);
  const [bookingsStats, setBookingsStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const profileRes = await getMyProviderProfile();
      setProfile(profileRes.data);

      // Fetch services
      const servicesRes = await getMyServices();
      setServices(servicesRes.data);

      // Fetch booking statistics
      const bookingsRes = await api.get("/bookings/provider");
      const bookings = bookingsRes.data;
      setBookingsStats({
        total: bookings.length,
        completed: bookings.filter((b) => b.status === "COMPLETED").length,
        pending: bookings.filter(
          (b) => b.status === "REQUESTED" || b.status === "ACCEPTED"
        ).length,
      });
    } catch (err) {
      if (err.response?.status === 404) {
        setProfile(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProfile = async () => {
    setError("");
    try {
      await createProviderProfile(bio);
      fetchAllData();
    } catch (err) {
      setError("Failed to create profile");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Provider Profile</h2>
        <p className="text-gray-600 text-sm">Manage your professional information, expertise, and customer ratings.</p>
      </div>

      {/* FIRST TIME PROVIDER */}
      {!profile && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-lg shadow-sm">
          <p className="mb-4 text-gray-700 text-sm">
            Create your provider profile to get started.
          </p>

          <textarea
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 mb-4"
            placeholder="Write about your experience..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="5"
          />

          {error && (
            <p className="text-red-600 text-sm mb-4 font-semibold">{error}</p>
          )}

          <button
            onClick={handleCreateProfile}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-sm hover:shadow-md"
          >
            Create Profile
          </button>
        </div>
      )}

      {/* PROFILE EXISTS */}
      {profile && (
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Full Name</p>
                <p className="text-gray-900 font-semibold mt-1">{authUser?.name || "Loading..."}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-gray-900 mt-1">{authUser?.email || "Loading..."}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Account Created</p>
                <p className="text-gray-900 mt-1">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : "Loading..."}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <div className="mt-1">
                  {profile?.approved ? (
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">✓ Approved</span>
                  ) : profile?.rejectionReason ? (
                    <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">✗ Rejected</span>
                  ) : (
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">⏳ Pending</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Professional Bio */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Bio</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
          </div>

          {/* Services List */}
          {services.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Services</h3>
              <div className="space-y-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="flex justify-between items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{service.serviceName}</p>
                      <p className="text-sm text-gray-600">{service.category?.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-indigo-600">₹{service.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* APPROVAL BANNER */}
          {!profile.approved && !profile.rejectionReason && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-800 font-semibold">⏳ Pending Approval</p>
              <p className="text-orange-700 text-sm">Your profile is pending admin approval. Once approved, customers can book your services.</p>
            </div>
          )}

          {profile.approved && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-semibold">✅ Profile Approved</p>
              <p className="text-green-700 text-sm">Your profile has been approved. You can now accept bookings from customers.</p>
            </div>
          )}

          {profile.rejectionReason && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-semibold">❌ Profile Rejected</p>
              <p className="text-red-700 text-sm">{profile.rejectionReason}</p>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProviderProfile;
