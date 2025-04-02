import env from "../../env";
import jwt, {SignOptions, JwtPayload} from "jsonwebtoken";
import {UnauthorizedException} from "../exceptions/unauthorized.exception";

export class JWT {
  static sign(payload: object, options: SignOptions = {expiresIn: "1h"}): string {
    return jwt.sign(payload, env.JWT_SECRET as string, options);
  }

  static verify<T = any>(token: string): T {
    try {
      return jwt.verify(token, env.JWT_SECRET as string) as T;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  static decode<T>(token: string): T {
    return jwt.decode(token) as T;
  }
}
