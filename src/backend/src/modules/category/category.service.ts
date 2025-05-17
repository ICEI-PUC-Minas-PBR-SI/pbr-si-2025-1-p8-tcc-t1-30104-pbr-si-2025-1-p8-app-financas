import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CategoryDto } from "./dto/category.dto";
import { ConflictException } from "@nestjs/common";

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CategoryDto) {
    const verifyCategory = await this.prisma.category.findFirst({
      where: { name: data.name, userId: data.userId },
    });

    if (verifyCategory) {
      throw new ConflictException("Categoria já existe");
    }

    const category = await this.prisma.category.create({
      data,
    });

    return category;
  }

  async findAllByUser(userId: string) {
    return await this.prisma.category.findMany({
      where: { userId: parseInt(userId, 10) },
      select: {
        id: true,
        name: true,
        active: true,
      },
      orderBy: {
        active: "desc",
      },
    });
  }

  async updateActive(categoryId: number, active: boolean) {
    return this.prisma.category.update({
      where: { id: categoryId },
      data: { active },
    });
  }

  async updateName(categoryId: number, name: string, userId: number) {
    const categoryToUpdate = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryToUpdate?.active) {
      throw new BadRequestException(
        "Não é possível alterar o nome de uma categoria inativa"
      );
    }

    const existingCategory = await this.prisma.category.findFirst({
      where: {
        name,
        userId,
        NOT: { id: categoryId },
      },
    });

    if (existingCategory) {
      throw new ConflictException("Já existe uma categoria com esse nome.");
    }

    return this.prisma.category.update({
      where: { id: categoryId },
      data: { name },
    });
  }
}
