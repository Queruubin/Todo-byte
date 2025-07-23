export interface Task {
  usuarioId: string;
  titulo: string;
  descripcion: string;
  prioridad: string;
  completada: boolean;
  dificultad: string;
  fechaLimite: string;
  categoriaId: string;
  usuarioId: string;
  tareaPadreId?: string | null;
}
