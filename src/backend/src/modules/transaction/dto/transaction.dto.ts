export type transactionDto = {
  id?: number;
  userId: number;
  categoryId: number;
  title: string;
  date: string;
  amount: number;
  type: 'entrada' | 'saida';
};

export type transactionSearchDto = {
  userId: number;
};
