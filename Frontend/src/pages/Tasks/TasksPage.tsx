import { DialogNewTask } from "./components/ModalCreateTask";
import { Task } from "./components/Task";

export function TasksPage() {
  return (
    <main className="flex flex-col h-full w-full p-6">
      <h1 className="text-3xl font-semibold">Universidad</h1>
      <section>
        <p className="text-gray-600 mt-4 font-semibold">
          Lista de tareas
        </p>
        <div className="mt-6">
          <DialogNewTask />

          <div className="mt-4 space-y-3 py-2">
            <Task />
            <Task />
            <Task />
            <Task />
          </div>
        </div>
      </section>
    </main>
  );
}