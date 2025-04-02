export interface Call {
  id: string;
  status: "waiting" | "active" | "on_hold" | "ended";
  queue_id: string;
  start_time: Date;
  end_time?: Date;
}

export interface CallDTO {
  id: string;
  status: "waiting" | "active" | "on_hold" | "ended";
  queue: string;
  start_time: string;
  end_time: string;
}

export interface CallsRequest {
  status?: string | string[];
  queue?: string | string[];
}

export interface CallEvent {
  id: string;
  type: string;
  timestamp: string;
  metadata: Record<string, any>;
}
