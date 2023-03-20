import { Injectable } from "@nestjs/common";
import { Application, Status } from "@prisma/client";
import { Response } from "src/interfaces";
import { ResponseStatus } from "src/interfaces/Status";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private readonly PrismaService: PrismaService) { }

  async getAllApplications(): Promise<Response> {
    try {
      const applications: Array<Application> = await this.PrismaService.application.findMany({});
      return {
        message: "Successful", applications, status: ResponseStatus.SUCCESSFUL
      }
    } catch (e) {
      return { message: "An Error Occurred", error: e.message.toString(), status: ResponseStatus.FAILED }
    }
  }

  async acceptApplication(applicationID: any): Promise<Response> {
    try {
      await this.PrismaService.application.update({
        where: { id: applicationID },
        data: { status: Status.APPROVED },
      });
      return { message: "Successful", status: ResponseStatus.SUCCESSFUL };
    } catch (e) {
      return { message: "Failed", error: e.message.toString(), status: ResponseStatus.FAILED };
    }
  }

  async declineApplication(applicationID: any): Promise<Response> {
    {
      try {
        await this.PrismaService.application.update({
          where: { id: applicationID },
          data: { status: Status.DECLINED },
        });
        return { message: "Successful", status: ResponseStatus.SUCCESSFUL };
      } catch (e) {
        return { message: "Failed", error: e.message.toString(), status: ResponseStatus.FAILED };
      }
    }
  }
}