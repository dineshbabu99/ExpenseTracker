export type ExpenseStatus = 'pending' | 'approved' | 'rejected';
export type ExpenseCategory = 'food' | 'transportation' | 'entertainment' | 'utilities' | 'other';


export interface User {
  id: string;
  name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
  status: ExpenseStatus;
  priority: number;
  userId: string;
  createdAt: string;
  updatedAt: string;

}

export interface CreateExpenseRequest {
  description: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
}

