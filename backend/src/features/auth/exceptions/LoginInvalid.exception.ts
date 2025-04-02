import {BaseException} from "../../../shared/exceptions/base.exception";

export class LoginInvalidException extends BaseException {
  constructor() {
    super("Login inválido", 401, "LoginInvalidException");
  }
}
