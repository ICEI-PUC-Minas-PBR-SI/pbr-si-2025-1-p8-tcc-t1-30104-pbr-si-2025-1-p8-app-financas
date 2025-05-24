import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Delete,
} from "@nestjs/common";
import { InvestmentService } from "./investment.service";
import { SimulateInvestmentDto, SimulateOnlyDto } from "./dto/investment.dto";
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

  @Post("simulate")
  async simulateInvestment(@Body() dto: SimulateOnlyDto) {
    return this.investmentService.simulateOnly(dto);
  }

  @Post("simulate/:userId")
  @UseGuards(JwtAuthGuard)
  async simulate(
    @Param("userId") userId: string,
    @Body() dto: SimulateInvestmentDto
  ) {
    return this.investmentService.simulateInvestment(dto, userId);
  }

  @Delete("delete/:investmentId")
  @UseGuards(JwtAuthGuard)
  async deleteInvestment(@Param("investmentId") investmentId: string) {
    return this.investmentService.deleteInvestment(investmentId);
  }
}
