import { Controller, Get, Param, UseGuards } from "@nestjs/common";
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
}
