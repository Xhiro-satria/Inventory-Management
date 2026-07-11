import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, User } from "lucide-react";
import toast from "react-hot-toast";
import authService from "../../services/auth.service";
import LogoutModal from "../auth/LogoutModal";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const logout = () => {
    authService.logout();
    toast.success("Logout berhasil");
    navigate("/login");
  };
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-blue-600">
        Inventory Management
      </h2>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition"
        >
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="text-right">
            <p className="font-semibold">
              {user.name}
            </p>

            <p className="text-sm text-gray-500">
              {user.role}
            </p>
          </div>

          <ChevronDown size={18} />

        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border z-50">

            <button
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 transition"
            >
              <User size={18} />
              <span>My Profile</span>
            </button>

            <hr />

            <button
              onClick={() => {
                  setOpen(false);
                  setLogoutOpen(true);
              }}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>

          </div>
        )}
      </div>
      <LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={logout}
      />
    </header>
  );
}

export default Navbar;