import { FaListUl } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const routes = [
  {
    path: "/home",
    label: "Tareas",
    icon: <FaListUl />
  },
  {
    path: "/about",
    label: "Importante",
    icon: <FaListUl />
  },
  {
    path: "/contact",
    label: "Configuración",
    icon: <FaListUl />
  }
]


export function HomeAside() {
  return (
    <aside className="w-80 bg-gray-50 text-gray-700 p-3">
      <h2 className="text-xl font-bold mb-4">Samuel</h2>
      <ul className="space-y-2 w-full">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              `flex items-center p-2 gap-5 rounded hover:bg-gray-200 transition-colors ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            {route.icon}
            {route.label}
          </NavLink>
        ))}
      </ul>
    </aside>
  );
}