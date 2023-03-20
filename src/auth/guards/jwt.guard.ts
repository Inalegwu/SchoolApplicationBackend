import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IncomingMessage } from "http";

export class JWTGuard implements CanActivate {
  constructor(private readonly JWTService: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest<IncomingMessage & { user: Record<string, unknown> }>(context);
    try {
      const token = this.getToken(request);
      console.log(token)
      const user = this.JWTService.verify(token);
      request.user = user;
      return true;
    } catch (e) {
      console.error(e)
      return false;
    }

  }

  protected getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  protected getToken(request: { headers: Record<string, string | string[]>; }): string {
    const authorization = request.headers["authorization"];

    if (!authorization || Array.isArray(authorization)) {
      throw new Error("Invalid authorization header")
    }

    const [_, token] = authorization.split(' ');

    return token;
  }

}
