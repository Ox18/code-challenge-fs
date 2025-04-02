export interface Call {
  id: string;
  status: string;
  queue_id: string;
  start_time: Date;
  end_time?: Date;
}
