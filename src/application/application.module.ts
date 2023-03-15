import { Module } from "@nestjs/common";
import { ApplicationService } from "./application.service";
import { ApplicationController } from "./application.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [ApplicationService, PrismaService],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
