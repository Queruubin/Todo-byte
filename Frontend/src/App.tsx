import { Routes, Route } from "react-router";
import { Login } from "./pages/Authentication/Login";
import { TasksPage } from "./pages/Tasks/TasksPage";
import { Layout } from "./common/components/HomeLayout";
import { Register } from "./pages/Authentication/Register";
import { Home } from "./pages/Home/Home";
import { Settings } from "./pages/Settings/Settings";


export function App () {
  return (
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route path="/register" index element={<Register />} />

        <Route element={<Layout />}>
          <Route path="tasks" element={<Home />} />
          <Route index path="task/:id/:nombre" element={<TasksPage />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    )
}

