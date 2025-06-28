import { IoAdd } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { ModalCreateCategorie } from "./ModalCreateCategorie";

const categories = [
  {
    label: "Universidad"
  },
  {
    label: "Trabajo"
  },
  {
    label: "Personal"
  },
  {
    label: "Hogar"
  }
]
export function GetCategories() {
  return (
    <div>
      <h2 className="font-bold text-gray-500 mb-2">Categorías</h2>
      <ul className="ml-4 space-y-1 mb-2">
        {categories.map((route) => (
          <NavLink
            key={route.label}
            to={`tasks/${route.label}`}
            className={({ isActive }) =>
              `flex items-center p-2 gap-5 rounded hover:bg-gray-200 transition-colors ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            {route.label}
          </NavLink>
        ))}
      </ul>

        <ModalCreateCategorie>
          <div
          className="flex flex-row items-center 
          p-2 gap-3 
          rounded 
          hover:bg-gray-200 
          transition-colors text-emerald-700
          cursor-pointer
          ">
          <IoAdd />
          Crear nueva categoría
        </div>
        </ModalCreateCategorie>
    </div>
  )
}