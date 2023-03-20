import { Application } from "@prisma/client";
import { ResponseStatus } from "./Status";

export interface Response {
  message: string;
  error?: string;
  application?: Application;
  applications?: Application[];
  status: ResponseStatus;
  access_token?: string;
}
