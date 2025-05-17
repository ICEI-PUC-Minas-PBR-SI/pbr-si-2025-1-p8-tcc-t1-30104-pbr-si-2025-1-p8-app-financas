import { Controller, Post, Body, Get, Param, UseGuards } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { transactionDto } from "./dto/transaction.dto";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("transaction")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: transactionDto) {
    return this.transactionService.create(data);
  }

  @Get("summary/:userId")
  @UseGuards(JwtAuthGuard)
  async getSummary(@Param("userId") userId: string) {
    return this.transactionService.getSummary(userId);
  }
}
