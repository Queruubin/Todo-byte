import { ModalUpdateTarea } from "./ModalUpdateTask";

enum TaskStatus {
  Pending = 'Pending',
  Completed = 'Completed'
}

export function Task() {
  return (
    <ModalUpdateTarea>
      <div className="flex flex-row border-2 border-gray-200 rounded-md p-5 cursor-pointer hover:bg-gray-50 transition-colors">
        <div>
          <input
            type="checkbox"
            className="
            relative size-5 appearance-none
            rounded-full border border-gray-500 bg-white
            before:absolute before:inset-1 before:rounded-full
            before:bg-white not-checked:before:hidden
            checked:border-emerald-600
            checked:bg-emerald-600
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-indigo-60
            disabled:border-gray-300
            disabled:bg-gray-100
            disabled:before:bg-gray-400
            forced-colors:appearance-auto
            cursor-pointer
            forced-colors:before:hidden" 
            onClick={(e) => e.stopPropagation()}
          />
                      
        </div>
        <div className="flex-1 flex flex-col ml-6">
          <p className="text-gray-800 font-semibold text-lg">Tarea de ejemplo</p>
          <p className="text-gray-600">Descripción de la tarea</p>
          <div className="flex flex-row justify-between items-center mt-2">
            <p>Fecha: {new Date().toLocaleDateString()}</p>
            <div className="border-emerald-800 bg-emerald-100 border-1 rounded-sm px-10">Fácil</div>
          </div>
        </div>
      </div>
    </ModalUpdateTarea>
  );
}