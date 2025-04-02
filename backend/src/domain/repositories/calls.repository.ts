import {Call} from "../../domain/models/call";

export interface CallsRepository {
  getCalls: (params: GetCalls.Params) => Promise<GetCalls.Result>;
  create: (params: Create.Params) => Promise<Create.Result>;
  findById: (params: FindById.Params) => Promise<FindById.Result>;
  update: (id: string, data: Partial<Call>) => Promise<void>;
}

export namespace GetCalls {
  export type Params = {
    status?: string | string[] | undefined;
    queue?: string | string[] | undefined;
  };
  export type Result = Call[];
}

export namespace Create {
  export type Params = {
    queue_id: string;
  };
  export type Result = Call;
}

export namespace FindById {
  export type Params = {
    id: string;
  };
  export type Result = Call;
}
