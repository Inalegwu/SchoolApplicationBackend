import { Injectable } from "@nestjs/common";
import { Application } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ApplicationService {
  constructor(private readonly PrismaService: PrismaService) {}

  async apply(application: Application) {
    console.log(application);
  }
}
