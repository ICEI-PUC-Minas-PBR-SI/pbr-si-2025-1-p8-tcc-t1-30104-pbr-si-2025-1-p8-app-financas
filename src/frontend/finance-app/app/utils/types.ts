export interface Transaction {
  id?: number
  userId: number
  categoryId: number
  type: "entrada" | "saida"
  title: string
  amount: number
  date: string
  categoryName?: string
  createdAt?: string
  updatedAt?: string
}

export interface TransactionSummary {
  totalBalance: number
  totalIncome: number
  totalExpense: number
  transactions: Transaction[]
}

export interface Category {
  id: number
  name: string
  active: boolean
}

export interface MessageItem {
  id: string
  text: string
  sender: "user" | "bot"
}

export interface Investment {
  id: number
  type: string
  title: string
  amount: number
  months: number
  monthlyContribution: number
  totalValue: number
  rateValue: number
  date: string
}
