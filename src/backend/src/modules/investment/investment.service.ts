import { ConflictException, Injectable } from "@nestjs/common";
import axios from "axios";
import { SimulateInvestmentDto, SimulateOnlyDto } from "./dto/investment.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class InvestmentService {
  constructor(private prisma: PrismaService) {}
  private readonly BASE_URL = "https://brasilapi.com.br/api/taxas/v1";

  async getAllRate() {
    const response = await axios.get(this.BASE_URL);
    return response.data;
  }

  async getAllSimulations(userId: string) {
    const investments = await this.prisma.investment.findMany({
      orderBy: { date: "desc" },
      where: {
        userId: parseInt(userId),
      },
    });

    return investments;
  }

  async simulateInvestment(dto: SimulateInvestmentDto, userId: string) {
    const { type } = dto;
    if (type != "selic" && type != "cdi" && type != "ipca") {
      throw new ConflictException("Tipo de investimento inválido");
    }
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
      today.getMonth() + 1
    ).padStart(2, "0")}/${today.getFullYear()}`;

    const response = await axios.get(this.BASE_URL + `/${type}`);

    const rateValue = response.data.valor;

    const totalValue = await this.getValue(dto, rateValue);

    const hasInvestment = await this.prisma.investment.findFirst({
      where: {
        userId: parseInt(userId),
        title: dto.title,
      },
    });

    if (hasInvestment) {
      throw new ConflictException("Já existe um investimento com esse título");
    }

    const investment = await this.prisma.investment.create({
      data: {
        userId: parseInt(userId),
        type: dto.type,
        title: dto.title,
        amount: dto.amount,
        months: dto.months,
        monthlyContribution: dto.monthlyContribution,
        totalValue: totalValue,
        rateValue: rateValue,
        date: formattedDate,
      },
    });

    return investment;
  }

  async simulateOnly(dto: SimulateOnlyDto) {
    const { type } = dto;

    if (type != "selic" && type != "cdi" && type != "ipca") {
      throw new ConflictException("Tipo de investimento inválido");
    }

    const response = await axios.get(this.BASE_URL + `/${type}`);

    const rateValue = response.data.valor;

    const totalValue = await this.getValue(dto, rateValue);

    return {
      ...dto,
      rateValue,
      totalValue,
    };
  }

  async getValue(
    dto: { amount: number; monthlyContribution: number; months: number },
    rateValue: number
  ) {
    const monthlyRate = Math.pow(1 + rateValue / 100, 1 / 12) - 1;

    const initialAmount = dto.amount * Math.pow(1 + monthlyRate, dto.months);

    const contributionAmount =
      dto.monthlyContribution *
      ((Math.pow(1 + monthlyRate, dto.months) - 1) / monthlyRate);

    const finalValue = initialAmount + contributionAmount;

    return Number(finalValue.toFixed(2));
  }

  async deleteInvestment(id: string) {
    const investment = await this.prisma.investment.delete({
      where: {
        id: parseInt(id),
      },
    });

    return investment;
  }
}
