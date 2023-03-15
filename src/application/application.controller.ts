import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApplicationService } from "./application.service";
import { Application } from "@prisma/client";
import { JWTGuard } from "src/auth/guards";

@UseGuards(JWTGuard)
@Controller("application")
export class ApplicationController {
  constructor(private readonly ApplicationService: ApplicationService) {}

  @Post("/create_application")
  async createApplication(@Body() application: Application) {
    return this.ApplicationService.apply(application);
  }
}
