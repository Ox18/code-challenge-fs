import { z } from "zod";

export const createMeetSchema = z.object({
  queue_id: z.string().min(1, "The queue is required"),
  name: z.string().min(1, "The name is required"),
});
