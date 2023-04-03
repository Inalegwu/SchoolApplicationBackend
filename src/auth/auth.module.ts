import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  imports: [PrismaModule, JwtModule.register({
    secret: "53CR3T5"
  })],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule]
})
export class AuthModule { }
