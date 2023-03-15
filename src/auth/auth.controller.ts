import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthDTO } from "src/interfaces";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("signup")
  async SignUp(@Body() dto: AuthDTO) {
    return this.AuthService.SignUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("/signin")
  async SignIn(@Body() dto: AuthDTO) {
    return this.AuthService.SignIn(dto);
  }

  @Post("/admin_signin")
  async signInAdmin(@Body() dto: AuthDTO) {
    return this.AuthService.signInAdmin(dto);
  }
}
