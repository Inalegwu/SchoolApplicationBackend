import { Module } from "@nestjs/common";
import { ApplicationService } from "./application.service";
import { ApplicationController } from "./application.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  providers: [ApplicationService, PrismaService],
  controllers: [ApplicationController],
  imports: [AuthModule]
})
export class ApplicationModule { }
