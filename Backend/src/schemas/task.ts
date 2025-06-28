import { z } from "zod";

export const schemaTask = z.object({
  titulo: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  descripcion: z.string().min(5, "La descripción debe tener al menos 5 caracteres"),
  fechaLimite: z.string().min(1, "La fecha límite es obligatoria"),
  prioridad: z.string().min(1, "La prioridad es obligatoria"),
  id: z.string().min(1, "El id es obligatorio"),
  categoriaId: z.string(),
  tareaPadreId: z.string().optional(),
});

export type schemaTask = z.infer<typeof schemaTask>;