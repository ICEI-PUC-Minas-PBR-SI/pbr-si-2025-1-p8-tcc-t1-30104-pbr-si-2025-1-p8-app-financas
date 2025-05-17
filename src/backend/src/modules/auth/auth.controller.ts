import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UnauthorizedException,
  HttpCode,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";
import { RegisterDto } from "./dto/register-user.dto";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const result = await this.authService.login(loginDto);
    return {
      status: "Ok!",
      message: "Login realizado com sucesso!",
      result: result,
    };
  }

  @Post("/register")
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    const result = await this.authService.register(registerDto);
    return {
      status: "success",
      message: "Usuário cadastrado com sucesso!",
      result,
    };
  }
}
