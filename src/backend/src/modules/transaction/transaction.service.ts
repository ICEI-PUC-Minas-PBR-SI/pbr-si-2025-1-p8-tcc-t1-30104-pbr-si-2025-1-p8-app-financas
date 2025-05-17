import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { transactionDto } from "./dto/transaction.dto";
import { BadRequestException } from "@nestjs/common";

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(data: transactionDto) {
    const transaction = await this.prisma.transaction.create({
      data: {
        ...data,
      },
    });

    return transaction;
  }

  async getSummary(userId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId: parseInt(userId, 10) },
      orderBy: { date: "desc" },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const totalIncome = transactions
      .filter(tx => tx.type === "entrada")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const totalExpense = transactions
      .filter(tx => tx.type === "saida")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const totalBalance = totalIncome - totalExpense;

    const transactionsWithCategory = transactions.map(tx => ({
      ...tx,
      categoryName: tx.category?.name,
    }));

    return {
      totalBalance,
      totalIncome,
      totalExpense,
      transactions: transactionsWithCategory,
    };
  }
}
