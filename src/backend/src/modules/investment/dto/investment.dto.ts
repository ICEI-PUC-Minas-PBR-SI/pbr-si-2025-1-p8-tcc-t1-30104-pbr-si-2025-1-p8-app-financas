import { IsNumber, IsString } from "class-validator";

export class SimulateInvestmentDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  months: number;

  @IsNumber()
  monthlyContribution: number;

  @IsString()
  type: string;

  @IsString()
  title: string;

  @IsString()
  date: string;
}
