import { z } from "zod";
import { STATUS_CALL } from "../../../shared/consts/statusCalls";

const StatusEnum = z.enum([
  STATUS_CALL.ACTIVE,
  STATUS_CALL.ENDED,
  STATUS_CALL.WAITING,
  STATUS_CALL.ON_HOLD,
]);

export const GetCallsRequestSchema = z.object({
  status: z.union([StatusEnum, z.array(StatusEnum)]).optional(),
  queue: z.union([z.string(), z.array(z.string())]).optional(),
});

export const CreateCallRequestSchema = z.object({
  queue_id: z.string(),
})

export type GetCallsRequestDTO = z.infer<typeof GetCallsRequestSchema>;

export type CreateCallRequestDTO = z.infer<typeof CreateCallRequestSchema>;