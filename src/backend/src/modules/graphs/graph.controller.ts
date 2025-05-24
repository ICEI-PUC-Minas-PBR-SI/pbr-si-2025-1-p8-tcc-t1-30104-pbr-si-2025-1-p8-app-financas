import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { GraphService } from "./graph.service";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("graphs")
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get("summary/:userId")
  @UseGuards(JwtAuthGuard)
  async getSummary(@Param("userId") userId: string) {
    return this.graphService.getSummary(userId);
  }

  @Get("statistics/:userId")
  async getStatistics(
    @Param("userId") userId: string,
    @Query("period") period: "day" | "week" | "month" | "year",
    @Query("category") category: "income" | "expenses"
  ) {
    return this.graphService.getStatistics(userId, period, category);
  }
}
