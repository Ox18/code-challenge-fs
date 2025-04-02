export type CreateMeetRequest = {
  queue_id: string;
};

export type GetMeetResponse = {
  status: string | null;
  start_time: Date;
};
