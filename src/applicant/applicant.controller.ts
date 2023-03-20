import { Controller, Get, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/decorators";
import { ApplicantService } from "./applicant.service";
import { JWTGuard } from "src/auth/guards";

@UseGuards(JWTGuard)
@Controller("applicant")
export class ApplicantController {
  constructor(private readonly ApplicantService: ApplicantService) { }

  @Get("/my_application")
  async getMyApplication(@GetUser() user: User) {
    return this.ApplicantService.getMyApplication(user);
  }
}
