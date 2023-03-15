import { Application } from "@prisma/client";
import { Status } from "./Status";

export interface Response {
  message: string;
  error?: string;
  application?: Application;
  status: Status;
}
