import {z} from "zod";

export const CreateMeetRequestSchame = z.object({
  queue_id: z.string(),
});

export const GetMeetResponseSchema = z.object({
  status: z.string(),
  start_time: z.date(),
})

export type CreateMeetRequestDTO = z.infer<typeof CreateMeetRequestSchame>;

export type GetMeetResponseDTO = z.infer<typeof GetMeetResponseSchema>;