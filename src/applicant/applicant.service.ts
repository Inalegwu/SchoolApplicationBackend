import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class ApplicantService {
  async getMyApplication(user: User) {
    console.log(user);
  }
}
