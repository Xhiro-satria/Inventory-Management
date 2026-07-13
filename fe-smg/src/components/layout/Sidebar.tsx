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
    <aside className="w-64 bg-zinc-950 text-white min-h-screen p-5 border-r border-zinc-800 flex flex-col justify-between antialiased">
      <div>
        <div className="px-3 py-4 mb-8">
          <h1 className="text-xl font-bold tracking-wider uppercase">
            Inventory<span className="text-yellow-400 font-light">.APP</span>
          </h1>
        </div>

        <div className="px-3 mb-3">
          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            Navigation Menu
          </p>
        </div>

        <nav className="space-y-1.5">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 outline-none group
                  ${
                    isActive
                      ? "bg-yellow-400 text-zinc-950 shadow-md shadow-yellow-500/10 font-semibold"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon 
                      size={18} 
                      className={`transition-colors duration-200 
                        ${isActive ? "text-zinc-950" : "text-zinc-400 group-hover:text-zinc-200"}`} 
                    />
                    <span>{menu.title}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
            Server Status: Connected
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;