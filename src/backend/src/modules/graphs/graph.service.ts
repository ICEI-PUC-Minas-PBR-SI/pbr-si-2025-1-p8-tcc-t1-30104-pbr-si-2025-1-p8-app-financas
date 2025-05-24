import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { format, isValid, parse } from "date-fns";

@Injectable()
export class GraphService {
  constructor(private prisma: PrismaService) {}

  private getDateFormatter(period: "day" | "week" | "month" | "year") {
    return (date: Date) => {
      switch (period) {
        case "day":
          return date.toLocaleTimeString("pt-BR", { hour: "2-digit" });
        case "week":
        case "month":
          return date.getDate().toString().padStart(2, "0");
        case "year":
          return date.toLocaleString("pt-BR", { month: "short" });
      }
    };
  }

  private getDateRange(period: "day" | "week" | "month" | "year") {
    const now = new Date();
    let start: Date;

    switch (period) {
      case "day":
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week":
        start = new Date(now);
        start.setDate(now.getDate() - 6);
        break;
      case "month":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "year":
      default:
        start = new Date(now.getFullYear(), 0, 1);
        break;
    }

    return { start, end: now };
  }

  aggregateChart(transactions, period) {
    const map = new Map<string, number>();

    for (const tx of transactions) {
      const [day, month, year] = tx.date.split("/").map(Number);
      const label = `${day.toString().padStart(2, "0")}/${month
        .toString()
        .padStart(2, "0")}`;

      const current = map.get(label) || 0;
      map.set(label, current + tx.amount);
    }

    const labels = Array.from(map.keys());
    const values = Array.from(map.values());

    return { labels, values };
  }

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

    const incomeByCategory: Record<string, any> = {};
    const expenseByCategory: Record<string, any> = {};
    const lastTransactionByCategory: Record<string, any> = {};

    const parseDate = (dateStr: string): Date => {
      const [day, month, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day);
    };

    for (const transaction of transactions) {
      if (!transaction.date) continue;

      const transactionDate = parseDate(transaction.date);
      const month = transactionDate.getMonth() + 1;
      const year = transactionDate.getFullYear();

      if (month === currentMonth && year === currentYear) {
        const categoryId = transaction.categoryId;

        const last = lastTransactionByCategory[categoryId];
        if (!last || parseDate(last.date) < transactionDate) {
          lastTransactionByCategory[categoryId] = transaction;
        }

        if (transaction.type === "entrada") {
          totalIncome += transaction.amount;
          incomeCount++;

          if (!incomeByCategory[categoryId]) {
            incomeByCategory[categoryId] = {
              name: transaction.category.name,
              total: 0,
            };
          }

          incomeByCategory[categoryId].total += transaction.amount;
        } else if (transaction.type === "saida") {
          totalExpense += transaction.amount;
          expenseCount++;

          if (!expenseByCategory[categoryId]) {
            expenseByCategory[categoryId] = {
              name: transaction.category.name,
              total: 0,
            };
          }

          expenseByCategory[categoryId].total += transaction.amount;
        }
      }
    }

    for (const [categoryId, lastTransaction] of Object.entries(
      lastTransactionByCategory
    )) {
      if (lastTransaction.type === "entrada" && incomeByCategory[categoryId]) {
        incomeByCategory[categoryId].lastTransaction = lastTransaction;
      }
      if (lastTransaction.type === "saida" && expenseByCategory[categoryId]) {
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

  async getStatistics(
    userId: string,
    period: "day" | "week" | "month" | "year",
    category: "income" | "expenses"
  ) {
    const { start, end } = this.getDateRange(period);

    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId: parseInt(userId, 10),
      },
      orderBy: { date: "asc" },
      include: {
        category: true,
      },
    });

    const filteredTransactions = transactions.filter(tx => {
      const [day, month, year] = tx.date.split("/").map(Number);
      const dateObj = new Date(year, month - 1, day);

      if (isNaN(dateObj.getTime())) {
        console.warn(`Data inválida: ${tx.date}`);
        return false;
      }

      if (category === "expenses" && tx.type !== "saida") return false;
      if (category === "income" && tx.type !== "entrada") return false;

      if (period === "day") {
        return (
          dateObj.getDate() === start.getDate() &&
          dateObj.getMonth() === start.getMonth() &&
          dateObj.getFullYear() === start.getFullYear()
        );
      }

      return dateObj >= start && dateObj <= end;
    });

    filteredTransactions.sort((a, b) => {
      const dateA = this.parseDateBR(a.date).getTime();
      const dateB = this.parseDateBR(b.date).getTime();
      return dateA - dateB;
    });

    const chart = this.aggregateChart(filteredTransactions, period);

    return {
      chart,
      transactions: filteredTransactions.map(tx => ({
        id: tx.id,
        date: tx.date,
        amount: tx.amount,
        type: tx.type,
        categoryName: tx.category?.name,
      })),
    };
  }

  parseDateBR(dateStr: string): Date {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  }
}
