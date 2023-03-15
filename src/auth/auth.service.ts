import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDTO } from "src/interfaces";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class AuthService {
  constructor(
    private Prisma: PrismaService,
    private config: ConfigService,
    private JWTService: JwtService
  ) {}

  // Sign in User
  async SignIn(dto: AuthDTO) {
    const user = await this.Prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException("Incorrect Email");

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException("Incorrect Password");

    return this.signToken(user.id, user.email);
  }

  async signInAdmin(dto: AuthDTO) {
    const user = await this.Prisma.admin.findFirst({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException("Incorrect Email");

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException("Incorrect Password");

    return this.signToken(user.id, user.email);
  }

  // create a new user account
  async SignUp(dto: AuthDTO) {
    const hash = await argon.hash(dto.password);
    try {
      if (!dto.firstName || !dto.lastName || !dto.email || !dto.password) {
        return { message: "Fill In All The Required Information" };
      }
      const user = await this.Prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
        select: {
          id: true,
          email: true,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if ((err.code = "P2002")) {
          return { message: "This User Already Exists" };
        }
        throw err;
      }
    }
  }

  // generate a HASH for the user that is being created
  async signToken(
    userID: number,
    email: string
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userID,
      email: email,
    };
    const secret = this.config.get("JWT_SECRET");

    const token = await this.JWTService.signAsync(payload, {
      expiresIn: "3h",
      secret: secret,
    });
    return { access_token: token };
  }
}
