import {
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register-user.dto";
import { Users } from "../users/users.model";
import removeProperties from "src/utils/removeProperties";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException("E-mail ou senha inválidas");
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new UnauthorizedException("Credenciais inválidas!");
    }

    return {
      token: this.jwtService.sign({ email }),
      user: removeProperties(user, "password", "createdAt", "updatedAt"),
    };
  }

  async register(@Body() body: RegisterDto) {
    const createUser = new Users();
    createUser.name = body.name;
    createUser.email = body.email;
    createUser.password = await bcrypt.hash(body.password, 10);
    createUser.document = body.document;

    const verifyUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: body.email }, { document: body.document }],
      },
    });

    if (verifyUser) {
      throw new UnauthorizedException("E-mail ou CPF já cadastrado!");
    }

    const user = await this.usersService.createUser(createUser);
    return removeProperties(user, "password");
  }
}
