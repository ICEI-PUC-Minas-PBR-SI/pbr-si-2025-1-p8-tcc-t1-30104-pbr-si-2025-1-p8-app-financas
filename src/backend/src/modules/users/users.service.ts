import { PrismaService } from "src/prisma.service";
import { Users } from "./users.model";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Users): Promise<Users> {
    const existing = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existing) {
      throw new ConflictException("E-mail já está em uso");
    }

    return this.prisma.user.create({
      data,
    });
  }

  async deleteUser(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        return null;
      }

      await this.prisma.transaction.deleteMany({ where: { userId: id } });
      await this.prisma.category.deleteMany({ where: { userId: id } });

      await this.prisma.user.delete({ where: { id } });

      return user;
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
      throw new Error("Erro ao excluir o usuário");
    }
  }

  async updateUserName(userId: number, name: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { name },
    });
  }

  async getUserInfo(id: number): Promise<Users> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }
}
