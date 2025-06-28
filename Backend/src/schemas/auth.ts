import { z } from "zod";

export const authSchema = z.object({
  nombre: z.string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(30, "El nombre de usuario no debe exceder 30 caracteres"),
  email: z.string()
    .email("Correo electrónico inválido"),
  password: z.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña no debe exceder 100 caracteres"),
});

export type AuthSchema = z.infer<typeof authSchema>;