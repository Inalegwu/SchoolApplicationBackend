import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(config: ConfigService, private Prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      igonreExpiration: false,
      secretOrKey: "53CRET5",
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.Prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      return { message: "You Are Not Logged In" };
    }
    delete user.hash;
    return user;
  }
}
