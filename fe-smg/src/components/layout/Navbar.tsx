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
  const [logoutOpen, setLogoutOpen] = useState(false);

  const logout = () => {
    authService.logout();
    toast.success("Logout berhasil");
    navigate("/login");
  };

  return (
    <header className="bg-zinc-950 border-b border-zinc-800 px-6 py-2 flex justify-between items-center antialiased">
      <h2 className="text-xl font-bold tracking-tight text-white uppercase">
        Inventory<span className="text-yellow-400 font-light">.app</span>
      </h2>
      
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 hover:bg-zinc-900 rounded-xl px-3 py-1.5 transition-all text-left outline-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-yellow-400 text-zinc-950 flex items-center justify-center font-bold text-sm shadow-md shadow-yellow-500/10">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="hidden sm:block">
            <p className="font-semibold text-sm text-zinc-100 group-hover:text-white transition-colors">
              {user.name || "User"}
            </p>
            <p className="text-xs text-zinc-400 font-mono">
              {user.role || "Operator"}
            </p>
          </div>

          <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 p-1.5 z-50">
            <button
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all text-left"
            >
              <User size={16} className="text-zinc-400" />
              <span>My Profile</span>
            </button>

            <div className="h-px bg-zinc-800 my-1" />

            <button
              onClick={() => {
                setOpen(false);
                setLogoutOpen(true);
              }}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all text-left"
            >
              <LogOut size={16} />
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