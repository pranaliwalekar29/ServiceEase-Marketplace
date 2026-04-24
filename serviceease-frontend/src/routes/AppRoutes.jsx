import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../routes/ProtectedRoute";

import CustomerDashboard from "../pages/customer/Dashboard";
import ProviderDashboard from "../pages/provider/Dashboard";
import PendingProviders from "../pages/admin/PendingProviders";
import ProviderProfile from "../pages/provider/Profile";
import CustomerBookings from "../pages/customer/Bookings";
import ProviderServices from "../pages/provider/Services";
import BrowseServices from "../pages/customer/BrowseServices";
import ProviderAvailability from "../pages/provider/Availability";
import ProviderBookings from "../pages/provider/Bookings";
import AdminCategories from "../pages/admin/Categories";
import CustomerProfile from "../pages/customer/Profile";
import ProviderPublicProfile from "../pages/customer/ProviderPublicProfile";




const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer */}
      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/bookings"
        element={
          <ProtectedRoute
          allowedRoles={["CUSTOMER"]}><CustomerBookings/></ProtectedRoute>
        }
      />

      <Route
        path="/customer/services"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <BrowseServices />
          </ProtectedRoute>
        }
      />
      <Route
  path="/customer/profile"
  element={
    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
      <CustomerProfile />
    </ProtectedRoute>
  }
/>

      {/* Provider */}
      <Route
        path="/provider/dashboard"
        element={
          <ProtectedRoute allowedRoles={["PROVIDER"]}>
            <ProviderDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/provider/profile"
        element={
          <ProtectedRoute allowedRoles={["PROVIDER"]}>
            <ProviderProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/provider/services"
        element={
          <ProtectedRoute allowedRoles={["PROVIDER"]}>
            <ProviderServices />
          </ProtectedRoute>
        }
      />
        <Route
          path="/provider/availability"
          element={
            <ProtectedRoute allowedRoles={["PROVIDER"]}>
              <ProviderAvailability />
            </ProtectedRoute>
          }
        />

        <Route
          path="/provider/bookings"
          element={
            <ProtectedRoute allowedRoles={["PROVIDER"]}>
              <ProviderBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/providers/:providerId"
          element={<ProviderPublicProfile />}
        />


      {/* Admin */}
      <Route
        path="/admin/providers/pending"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <PendingProviders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminCategories />
          </ProtectedRoute>
          }
      />
      </Routes>
      


    
  );
};

export default AppRoutes;
