import { z } from "zod";

export const CallInitiatedSchema = z.object({
  call_id: z.string().length(24, { message: "call_id debe tener exactamente 24 caracteres" }),
  type: z.enum(["audio", "video"]),
  queue_id: z.string().length(24, { message: "queue_id debe tener exactamente 24 caracteres" }),
});
