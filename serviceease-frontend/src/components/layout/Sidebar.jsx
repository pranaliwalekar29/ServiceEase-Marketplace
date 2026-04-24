import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Search,
  ClipboardList,
  User,
  Briefcase,
  CalendarClock,
  UserCheck,
  LogOut,
  Home
} from "lucide-react";


const Sidebar = () => {
  const { user, logout } = useAuth();
  const role = user?.role;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Dynamic colors based on user role
  const getRoleColors = (role) => {
    switch (role) {
      case "CUSTOMER":
        return {
          bg: "bg-gradient-to-b from-blue-50 to-blue-100",
          border: "border-blue-200",
          icon: "text-blue-600",
          activeLink: "bg-blue-600 text-white shadow-md",
          hoverLink: "hover:bg-blue-50",
          logoutHover: "hover:bg-blue-50",
          logoutText: "text-blue-600 hover:text-blue-700",
          badgeColor: "bg-blue-600",
        };
      case "PROVIDER":
        return {
          bg: "bg-gradient-to-b from-green-50 to-green-100",
          border: "border-green-200",
          icon: "text-green-600",
          activeLink: "bg-green-600 text-white shadow-md",
          hoverLink: "hover:bg-green-50",
          logoutHover: "hover:bg-green-50",
          logoutText: "text-green-600 hover:text-green-700",
          badgeColor: "bg-green-600",
        };
      case "ADMIN":
        return {
          bg: "bg-gradient-to-b from-orange-50 to-orange-100",
          border: "border-orange-200",
          icon: "text-orange-600",
          activeLink: "bg-orange-600 text-white shadow-md",
          hoverLink: "hover:bg-orange-50",
          logoutHover: "hover:bg-orange-50",
          logoutText: "text-orange-600 hover:text-orange-700",
          badgeColor: "bg-orange-600",
        };
      default:
        return {
          bg: "bg-white",
          border: "border-gray-200",
          icon: "text-indigo-600",
          activeLink: "bg-indigo-600 text-white shadow-md",
          hoverLink: "hover:bg-gray-100",
          logoutHover: "hover:bg-red-50",
          logoutText: "text-red-600 hover:text-red-700",
          badgeColor: "bg-indigo-600",
        };
    }
  };

  const colors = getRoleColors(role);

  const linkClass = ({ isActive }) =>
   `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
    isActive
      ? colors.activeLink
      : `text-gray-700 ${colors.hoverLink}`
  }`;

  return (
    <aside className={`w-64 ${colors.bg} border-r-2 ${colors.border} p-4 h-screen overflow-y-auto flex flex-col transition-all duration-300`}>
      <div className={`flex items-center gap-2 mb-8 pb-4 border-b-2 ${colors.border}`}>
        <div className={`${colors.badgeColor} p-2 rounded-lg`}>
          <Home className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900">
          ServiceEase
        </span>
      </div>

      {/* CUSTOMER */}
      {role === "CUSTOMER" && (
        <nav className="space-y-2">
          <NavLink to="/customer/dashboard" className={linkClass}><LayoutDashboard className="w-4 h-4"/>Dashboard</NavLink>
          <NavLink to="/customer/profile" className={linkClass}><User className="w-4 h-4" />My Profile</NavLink>
          <NavLink to="/customer/services" className={linkClass}><Search className="w-4 h-4" />Browse Services</NavLink>
          <NavLink to="/customer/bookings" className={linkClass}><ClipboardList className="w-4 h-4" />My Bookings</NavLink>
        </nav>
      )}

      {/* PROVIDER */}
      {role === "PROVIDER" && (
        <nav className="space-y-2">
          <NavLink to="/provider/dashboard" className={linkClass}><LayoutDashboard className="w-4 h-4" />Dashboard</NavLink>
          <NavLink to="/provider/profile" className={linkClass}><User className="w-4 h-4" />My Profile</NavLink>
          <NavLink to="/provider/services" className={linkClass}><Briefcase className="w-4 h-4" />My Services</NavLink>
          <NavLink to="/provider/availability" className={linkClass}><CalendarClock className="w-4 h-4" />Set Availability</NavLink>
          <NavLink to="/provider/bookings" className={linkClass}><ClipboardList className="w-4 h-4" />Bookings</NavLink>
        </nav>
      )}

      {/* ADMIN */}
      {role === "ADMIN" && (
        <nav className="space-y-2">
          <NavLink to="/admin/providers/pending" className={linkClass}> <UserCheck className="w-4 h-4" />Pending Providers</NavLink>
          <NavLink to="/admin/categories" className={linkClass}><Briefcase className="w-4 h-4" />Manage Categories</NavLink>
        </nav>
      )}

      <button
        onClick={handleLogout}
        className={`mt-auto pt-4 border-t-2 ${colors.border} w-full flex items-center gap-3 px-4 py-3 ${colors.logoutText} ${colors.logoutHover} rounded-lg font-medium transition-all duration-200`}
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
