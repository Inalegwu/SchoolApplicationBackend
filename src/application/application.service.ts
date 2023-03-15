import { Injectable } from "@nestjs/common";
import { Application } from "@prisma/client";
import { Response, Status } from "src/interfaces";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ApplicationService {
  constructor(private readonly PrismaService: PrismaService) {}

  async apply(application: Application): Promise<Response> {
    try {
      await this.PrismaService.application.create({ data: application });
      return { message: "Successful", status: Status.SUCCESSFUL };
    } catch (e) {
      return {
        message: "Successful",
        status: Status.FAILED,
        error: e.message.toString(),
      };
    }
  }
}
