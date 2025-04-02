export interface Me {
  name: string;
  photo_url: string;
}

export interface Login {
  token: string;
}

export interface Register {
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  queue_id: string;
}
