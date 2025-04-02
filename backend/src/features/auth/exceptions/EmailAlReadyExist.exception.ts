import {BaseException} from "../../../shared/exceptions/base.exception";

export class EmailAlReadyExistException extends BaseException {
  constructor() {
    super("Email already exist", 400, "EmailAlReadyExistException");
  }
}
