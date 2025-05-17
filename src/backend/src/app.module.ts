import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ChatModule } from "./modules/chat/chat.module";
import { CategoryModule } from "./modules/category/category.module";
import { TransactionModule } from "./modules/transaction/transaction.module";
import { GraphModule } from "./modules/graphs/graph.module";
import { InvestmentModule } from "./modules/investment/investment.module";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ChatModule,
    CategoryModule,
    TransactionModule,
    GraphModule,
    InvestmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
