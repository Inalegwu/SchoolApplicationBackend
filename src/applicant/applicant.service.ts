import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { Response, ResponseStatus } from "src/interfaces";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ApplicantService {
  constructor(private readonly PrismaService: PrismaService) { }
  async getMyApplication(user: User): Promise<Response> {
    console.log(user);
    try {
      const application = await this.PrismaService.application.findFirst({
        where: { user: { some: { id: { equals: user.id } } } },
      });
      return { message: "Successful", application, status: ResponseStatus.SUCCESSFUL };
    } catch (e) {
      return {
        message: "Failed",
        error: e.message.toString(),
        status: ResponseStatus.FAILED,
      };
    }
  }
}
