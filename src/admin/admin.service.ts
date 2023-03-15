import { Injectable } from "@nestjs/common";
import { Status } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private readonly PrismaService: PrismaService) {}

  async getAllApplications() {
    try {
      const applications = await this.PrismaService.application.findMany({});
      return { message: "Successfull", applications };
    } catch (e) {
      return { message: "Failed", error: e.message.toString() };
    }
  }

  async acceptApplication(applicationID: any) {
    try {
      await this.PrismaService.application.update({
        where: { id: applicationID },
        data: { status: Status.APPROVED },
      });
      return { message: "Successfull" };
    } catch (e) {
      return { message: "Failed", error: e.message.toString() };
    }
  }

  async declineApplication(applicationID: any) {
    try {
      await this.PrismaService.application.update({
        where: { id: applicationID },
        data: { status: Status.DECLINED },
      });
      return { message: "Successfull" };
    } catch (e) {
      return { message: "Failed", error: e.message.toString() };
    }
  }
}
