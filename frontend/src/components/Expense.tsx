import { SpendCard } from "./SpendCard";
import "../style.css"
import { AddExpense } from "./AddExpence";
import { Graph } from "./graph";
import { ExpenseList } from "./ExpenseList";
import { categories } from "../data/mockExpence";
import type { RootState } from "../store";
import { useSelector } from "react-redux";









export function Expense() {
  const expenses = useSelector((state: RootState) => state.expense.items);
const totalSpending = expenses.reduce((total, expense) => total + expense.amount, 0);
const monthlySpent = expenses.filter(expense => {
  const expenseDate = new Date(expense.date);
  const now = new Date();
  return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
}).reduce((total, expense) => total + expense.amount, 0);
const categoryMap: Record<string, number> = {};

expenses.forEach(exp => {
  categoryMap[exp.category] =
    (categoryMap[exp.category] || 0) + Number(exp.amount || 0);
});
let topCategoryId = "";
let max = 0;

for (const key in categoryMap) {
  if (categoryMap[key] > max) {
    max = categoryMap[key];
    topCategoryId = key;
  }
}
const topCategories = categories.find(c => c.id === topCategoryId)?.label || "--";


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SpendCard title="Total Spending" amount={totalSpending} />
        <SpendCard title="This Month" amount={monthlySpent} />
        <SpendCard title="Top Categories" amount={topCategories} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-4">
        
        <div className="flex flex-col gap-4">
          <AddExpense />
        </div>

        <div className="flex flex-col gap-4">
          <Graph />

          <div className="rounded-xl">
            <ExpenseList />
          </div>
        </div>

      </div>
    </>
  );
}