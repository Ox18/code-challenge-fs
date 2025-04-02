import {BaseException} from "../../../shared/exceptions/base.exception";

export class InvalidResourceException extends BaseException {
  constructor() {
    super("Invalid resource", 400, "InvalidResourceException");
  }
}
