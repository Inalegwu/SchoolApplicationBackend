import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService],
  imports: [AuthModule]
})
export class AdminModule { }
