import { ForbiddenException, Injectable, Res } from "@nestjs/common";
import { AuthDTO, Response, ResponseStatus } from "src/interfaces";
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
  ) { }

  // Sign in User
  async SignIn(dto: AuthDTO): Promise<Response> {
    const user = await this.Prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException("Incorrect Email");

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException("Incorrect Password");

    const { access_token } = await this.signToken(user.id, user.email);

    return { message: "Successfully signed in", access_token, status: ResponseStatus.SUCCESSFUL };
  }

  async signInAdmin(dto: AuthDTO): Promise<Response> {
    const user = await this.Prisma.admin.findFirst({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException("Incorrect Email");

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException("Incorrect Password");

    const { access_token } = await this.signToken(user.id, user.email);

    return { message: "Admin Signed in Sucessully", status: ResponseStatus.SUCCESSFUL, access_token }
  }

  // create a new user account
  async SignUp(dto: AuthDTO): Promise<Response> {
    const hash = await argon.hash(dto.password);
    try {
      if (!dto.firstName || !dto.lastName || !dto.email || !dto.password) {
        return { message: "Fill In All The Required Information", status: ResponseStatus.FAILED };
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
      const { access_token } = await this.signToken(user.id, user.email);
      return { message: "Account Created Successfully", access_token: access_token, status: ResponseStatus.SUCCESSFUL }
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if ((err.code = "P2002")) {
          return { message: "This User Already Exists", status: ResponseStatus.FAILED };
        }
        throw err;
      }
    }
  }

  async seedAdmin(dto: AuthDTO): Promise<Response> {
    try {
      const hash = await argon.hash(dto.password);
      await this.Prisma.admin.create({ data: { email: dto.email, hash } });
      return { message: "Admin Database Seeded Successfully", status: ResponseStatus.SUCCESSFUL }
    } catch (e) {
      return { message: "An error occurred", status: ResponseStatus.FAILED }
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
      expiresIn: "9h",
    });
    return { access_token: token };
  }
}
