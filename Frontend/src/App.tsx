import { Routes, Route } from "react-router";
import { Login } from "./pages/Authentication/Login";
import axios from 'axios'
import { TasksPage } from "./pages/Tasks/TasksPage";
import { Layout } from "./common/components/HomeLayout";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';


export function App () {
  return (
      <Routes>
        <Route path="/" index element={<Login />} />

        <Route element={<Layout />}>
          <Route index path="tasks" element={<TasksPage />} />
        </Route>
      </Routes>
    )
}

