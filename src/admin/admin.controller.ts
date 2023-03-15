import { Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { JWTGuard } from "src/auth/guards";
import { AdminService } from "./admin.service";

@UseGuards(JWTGuard)
@Controller("admin")
export class AdminController {
  constructor(private readonly AdminService: AdminService) {}

  @Get("/fetch_applications")
  async getApplications() {
    return this.AdminService.getAllApplications();
  }

  @Patch("/accept_application/:application_id")
  async acceptApplication(@Param("application_id") applicationID: any) {
    return this.AdminService.acceptApplication(applicationID);
  }
  @Patch("/decline_application/:application_id")
  async declineApplication(@Param("application_id") applicationID: any) {
    return this.AdminService.declineApplication(applicationID);
  }
}
