import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class GraphService {
  constructor(private prisma: PrismaService) {}

  async getSummary(userId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId: parseInt(userId, 10),
      },
      select: {
        amount: true,
        type: true,
        date: true,
        categoryId: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    let totalIncome = 0;
    let totalExpense = 0;
    let incomeCount = 0;
    let expenseCount = 0;

    const incomeByCategory = {};
    const expenseByCategory = {};

    const lastTransactionByCategory = {};

    for (const transaction of transactions) {
      if (!transaction.date) continue;

      const [day, month, year] = transaction.date.split("/").map(Number);

      if (month === currentMonth && year === currentYear) {
        if (
          !lastTransactionByCategory[transaction.categoryId] ||
          new Date(transaction.date) >
            new Date(lastTransactionByCategory[transaction.categoryId].date)
        ) {
          lastTransactionByCategory[transaction.categoryId] = transaction;
        }

        if (transaction.type === "entrada") {
          totalIncome += transaction.amount;
          incomeCount++;
          if (!incomeByCategory[transaction.categoryId]) {
            incomeByCategory[transaction.categoryId] = {
              name: transaction.category.name,
              total: 0,
            };
          }
          incomeByCategory[transaction.categoryId].total += transaction.amount;
        } else if (transaction.type === "saida") {
          totalExpense += transaction.amount;
          expenseCount++;

          if (!expenseByCategory[transaction.categoryId]) {
            expenseByCategory[transaction.categoryId] = {
              name: transaction.category.name,
              total: 0,
            };
          }
          expenseByCategory[transaction.categoryId].total += transaction.amount;
        }
      }
    }

    for (const categoryId in incomeByCategory) {
      const lastTransaction = lastTransactionByCategory[categoryId];
      if (lastTransaction && lastTransaction.type === "entrada") {
        incomeByCategory[categoryId].lastTransaction = lastTransaction;
      }
    }

    for (const categoryId in expenseByCategory) {
      const lastTransaction = lastTransactionByCategory[categoryId];
      if (lastTransaction && lastTransaction.type === "saida") {
        expenseByCategory[categoryId].lastTransaction = lastTransaction;
      }
    }

    return {
      totalIncome,
      totalExpense,
      total: totalIncome - totalExpense,
      incomeCount,
      expenseCount,
      incomeByCategory,
      expenseByCategory,
    };
  }
}
