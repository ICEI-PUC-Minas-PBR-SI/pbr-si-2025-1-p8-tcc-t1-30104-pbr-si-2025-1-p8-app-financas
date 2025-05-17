import { Module } from "@nestjs/common";
import { GraphController } from "./graph.controller";
import { GraphService } from "./graph.service";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [GraphController],
  providers: [GraphService, PrismaService],
})
export class GraphModule {}
