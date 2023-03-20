import { Injectable } from "@nestjs/common";
import { Application } from "@prisma/client";
import { Response, ResponseStatus } from "src/interfaces";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ApplicationService {
  constructor(private readonly PrismaService: PrismaService) { }

  async apply(application: Application): Promise<Response> {
    try {
      await this.PrismaService.application.create({ data: application });
      return { message: "Successful", status: ResponseStatus.SUCCESSFUL };
    } catch (e) {
      return {
        message: "Successful",
        status: ResponseStatus.FAILED,
        error: e.message.toString(),
      };
    }
  }
}
