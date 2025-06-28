import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { ImExit } from "react-icons/im";



import { NavLink } from "react-router-dom";
import { GetCategories } from "./GetCategories";

const routes = [
  {
    path: "/user",
    label: "Usuario",
    icon: <FaUser />
  },
  {
    path: "/settings",
    label: "Importante",
    icon: <IoSettingsSharp />
  }
]


export function HomeAside() {
  return (
    <aside className="w-80 bg-gray-50 text-gray-700 p-3">
      <h2 className="text-xl font-bold mb-4">Samuel</h2>
      <GetCategories />
      <br />
      <hr />
      <br />
      <ul className="space-y-2 w-full">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              `flex items-center p-2 gap-5 rounded hover:bg-gray-200 transition-colors ${isActive ? "bg-gray-200" : ""
              }`
            }
          >
            {route.icon}
            {route.label}
          </NavLink>
        ))}
        <div className="flex items-center p-2 gap-5 rounded hover:bg-gray-200 transition-colors text-red-600 cursor-pointer">
          <ImExit />
          Cerrar sesión
        </div>
      </ul>

    </aside>
  );
}