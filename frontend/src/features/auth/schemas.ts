import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email("Correo inválido").min(1, "El email es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const RegisterFormSchema = z.object({
  email: z.string().email("Correo inválido").min(1, "El email es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  queue: z.string().min(1, "La cola es obligatoria"),
});
