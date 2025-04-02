import {z} from "zod";

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const MeResponseSchema = z.object({
  name: z.string(),
  photo_url: z.string(),
});

export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  queue_id: z.string(),
});

export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>;

export type MeResponseDTO = z.infer<typeof MeResponseSchema>;

export type CreateRequestDTO = z.infer<typeof RegisterRequestSchema>;

export type RegisterRequestDTO = z.infer<typeof RegisterRequestSchema>;
