import {
    LayoutDashboard,
    Boxes,
    Package,
    ArrowLeftRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menus = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        title: "Category",
        icon: Boxes,
        path: "/category",
    },
    {
        title: "Product",
        icon: Package,
        path: "/product",
    },
    {
        title: "Inventory",
        icon: ArrowLeftRight,
        path: "/inventory",
    },

];

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-10">
        Inventory
      </h1>

      <nav className="space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />

              {menu.title}
            </NavLink>
          );
        })}
      </nav>

    </aside>
  );
}

export default Sidebar;