export interface Transaction {
  id?: number
  userId: number
  categoryId: number
  type: 'entrada' | 'saida'
  title: string
  amount: number
  date: string
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
}
