import { Module } from "@nestjs/common";
import { ApplicantService } from "./applicant.service";
import { ApplicantController } from "./applicant.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [ApplicantService, PrismaService],
  controllers: [ApplicantController],
})
export class ApplicantModule {}
