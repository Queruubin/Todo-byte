import { Routes, Route } from "react-router";
import { Login } from "./pages/Authentication/Login";
import { TasksPage } from "./pages/Tasks/TasksPage";
import { Layout } from "./common/components/HomeLayout";
import { Register } from "./pages/Authentication/Register";


export function App () {
  return (
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route path="/register" index element={<Register />} />

        <Route element={<Layout />}>
          <Route index path="tasks" element={<TasksPage />} />
        </Route>
      </Routes>
    )
}

