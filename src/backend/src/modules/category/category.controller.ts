import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/auth.guard";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./dto/category.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() data: CategoryDto) {
    return this.categoryService.create(data);
  }

  @Get("byuser/:userId")
  async findAllByUser(@Param("userId") userId: string) {
    return this.categoryService.findAllByUser(userId);
  }

  @Put("updatename/:categoryId")
  @UseGuards(JwtAuthGuard)
  async updateName(
    @Param("categoryId") id: string,
    @Body() data: { name: string; userId: number }
  ) {
    const updateCategory = await this.categoryService.updateName(
      Number(id),
      data.name,
      data.userId
    );

    return updateCategory;
  }

  @Put("updateactive/:categoryId")
  @UseGuards(JwtAuthGuard)
  async updateActive(
    @Param("categoryId") id: string,
    @Body("active") active: boolean
  ) {
    const updateCategory = await this.categoryService.updateActive(
      Number(id),
      active
    );

    return updateCategory;
  }
}
