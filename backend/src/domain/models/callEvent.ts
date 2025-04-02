export interface CallEvent {
  id: string;
  call_id: string;
  type: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}
