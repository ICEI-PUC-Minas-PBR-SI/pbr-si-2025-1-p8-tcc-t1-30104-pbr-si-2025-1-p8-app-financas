import {
  Controller,
  Put,
  Body,
  Req,
  UseGuards,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/auth.guard";
import { Request } from "express";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Put("edituser/:id")
  @UseGuards(JwtAuthGuard)
  async updateUserName(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const updatedUser = await this.userService.updateUserName(
      Number(id),
      updateUserDto.name
    );

    return {
      status: "Ok!",
      message: "Nome atualizado com sucesso!",
      result: updatedUser,
    };
  }

  @Delete("deleteuser/:id")
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param("id") id: string) {
    const deletedUser = await this.userService.deleteUser(Number(id));
    return deletedUser;
  }
}
