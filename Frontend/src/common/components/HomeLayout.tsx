import { Outlet } from "react-router-dom";
import { HomeAside } from "./Aside";

export function Layout() {
  return (
    <main className="flex flex-row h-screen bg-gray-100 w-screen">
      <HomeAside />
      <div className="bg-white rounded-lg shadow-md w-full overflow-auto">
        <Outlet />
      </div>
    </main>
  );
}