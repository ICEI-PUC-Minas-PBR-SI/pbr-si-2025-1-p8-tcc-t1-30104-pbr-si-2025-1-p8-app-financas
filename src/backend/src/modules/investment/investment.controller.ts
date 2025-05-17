import { Controller, Post, Body, Get, Param, UseGuards } from "@nestjs/common";
import { InvestmentService } from "./investment.service";
import { SimulateInvestmentDto } from "./dto/investment.dto";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("investment")
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Get("rate")
  async getAllRate() {
    return this.investmentService.getAllRate();
  }

  @Get("simulations/:userId")
  @UseGuards(JwtAuthGuard)
  async getAllSimulations(@Param("userId") userId: string) {
    return this.investmentService.getAllSimulations(userId);
  }

  @Post("simulate/:userId")
  @UseGuards(JwtAuthGuard)
  async simulate(
    @Param("userId") userId: string,
    @Body() dto: SimulateInvestmentDto
  ) {
    return this.investmentService.simulateInvestment(dto, userId);
  }
}
