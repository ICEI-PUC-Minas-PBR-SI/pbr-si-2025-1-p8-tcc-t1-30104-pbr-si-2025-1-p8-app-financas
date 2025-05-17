import { INestApplication, OnModuleInit } from "@nestjs/common";
import { PrismaClient, Prisma } from "@prisma/client";

export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, "beforeExit">
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
