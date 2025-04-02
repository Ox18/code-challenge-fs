import {BaseException} from "./base.exception";

export class SupportException extends BaseException {
  constructor() {
    super("Please contact support", 500, "SupportException");
  }
}
