import {BaseException} from "./base.exception";

export class ResourceNotFoundException extends BaseException {
  constructor() {
    super("Resource not found", 404, "ResourceNotFoundException");
  }
}
