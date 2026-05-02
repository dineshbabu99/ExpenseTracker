





import "../style.css"
import { useState } from "react";
import { categories } from "../data/mockExpence";

import { useDispatch, useSelector } from "react-redux";
type DateRange = {
  startDate: string;
  endDate: string;
};

type AmountRange = {
  min: string;
  max: string;
};
import type { RootState } from "../store";
import { deleteExpense } from "../slice/expenseSlice";




export function ExpenseList() {

  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.expense.items);

  const [activeTab, setActiveTab] = useState('expenses');
  const [sortBy, setSortBy] = useState<"date" | "amount" | null>(null);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: "",
    endDate: ""
  });

  const [amountRange, setAmountRange] = useState<AmountRange>({
    min: "",
    max: ""
  });
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSort = (field: "date" | "amount") => {
    if (sortBy === field) {
      setOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };


  const filteredExpenses = expenses
    .filter(exp => {
      // category
      if (selectedCategory && exp.category !== selectedCategory) return false;

      // search
      if (searchText && !exp.description.toLowerCase().includes(searchText.toLowerCase())) return false;

      // date
      if (dateRange.startDate && new Date(exp.date) < new Date(dateRange.startDate)) return false;
      if (dateRange.endDate && new Date(exp.date) > new Date(dateRange.endDate)) return false;

      // amount
      if (amountRange.min && exp.amount < Number(amountRange.min)) return false;
      if (amountRange.max && exp.amount > Number(amountRange.max)) return false;

      return true;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;

      const valA = sortBy === "date" ? new Date(a.date).getTime() : a.amount;
      const valB = sortBy === "date" ? new Date(b.date).getTime() : b.amount;

      return order === "asc" ? valA - valB : valB - valA;
    });








  return (
    <>
<div className="cardbg p-4 rounded-lg flex flex-col h-[calc(100vh-500px)]">
                   <div className="mb-2 flex space-x-4">
          <button
            onClick={() => setActiveTab("expenses")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
          ${activeTab === "expenses"
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
              }`}>
            Expenses
          </button>
          <button
            onClick={() => setActiveTab("filters")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
          ${activeTab === "filters"
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
              }`}
          >
            Filters
          </button>
        </div>
        <div className="border-b border-gray-800 mb-4"></div>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="input-field flex-1 min-w-[200px]"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select className="input-field min-w-[180px]"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => handleSort("date")}
            className={`px-4 py-2 rounded-lg border text-sm flex items-center gap-1 transition-all duration-200 ${sortBy === "date"
                ? "border-green-800 text-green-300 bg-green-800/10"
                : "border-white/10 text-gray-400 hover:text-white hover:border-white/10"
              }`}
          >
            📅 Date {sortBy === "date" && (order === "asc" ? "↑" : "↓")}
          </button>

          <button
            onClick={() => handleSort("amount")}
            className={`px-4 py-2 rounded-lg border text-sm flex items-center gap-1 transition-all duration-200 ${sortBy === "amount"
                ? "border-green-800 text-green-300 bg-green-800/10"
                : "border-white/10 text-gray-400 hover:text-white hover:border-white/10"
              }`}
          >
            ⇅ Amount {sortBy === "amount" && (order === "asc" ? "↑" : "↓")}
          </button>
        </div>
        {activeTab === "filters" && (
          <ExpenseFilter
            dateRange={dateRange}
            setDateRange={setDateRange}
            amountRange={amountRange}
            setAmountRange={setAmountRange}
          />
        )}          
      <ul className="space-y-3 pr-2 flex-1 overflow-y-auto">
     {filteredExpenses.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">
            No expenses found 👀
          </p>
        ) : (
          filteredExpenses.map(expense => (
            <ExpenseItem key={expense.id} {...expense} />
          ))
        )}
        </ul>
      <div className="text-gray-600 mt-4 flex justify-between items-center">
    <p>{filteredExpenses.length} entries shown</p>
    <p className="text-green-500">
      ₹{filteredExpenses
        .reduce((sum, expense) => sum + Number(expense.amount || 0), 0)
        .toFixed(2)}
    </p>
  </div>
      </div>
    </>
  )
}



export function ExpenseItem(props: { id: string; description: string; category: string; date: string; amount: number }) {
  const category = categories.find(c => c.id === props.category);
  const dispatch = useDispatch();
  return (
    <>
      <li className="flex justify-between items-center expensecard">
        <div className="flex items-center gap-3">
          <span
            className="iconcard"
            style={{ backgroundColor: category?.bg, }}>
            {category?.icon}
          </span>
          <div className="flex flex-col expensedetails">
            <p className="text-white font-semibold">
              {props.description ? props.description : props.category}
            </p>
            <p className="catp" style={{ color: category?.color }}>
              {props.category} - {new Date(props.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-bold" style={{ color: category?.color }}>
            ₹{props.amount}
          </p>
          <span className="text-gray-500 hover:text-white cursor-pointer" onClick={() => dispatch(deleteExpense(props.id))}>
            ✕
          </span>
        </div>
      </li>
    </>
  )
}


type ExpenseFilterProps = {
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
  amountRange: AmountRange;
  setAmountRange: React.Dispatch<React.SetStateAction<AmountRange>>;
};

export function ExpenseFilter({ dateRange, setDateRange, amountRange, setAmountRange }: ExpenseFilterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="flex flex-col">
        <label className="text-gray-400 text-sm mb-1">From Date</label>
        <input
          type="date"
          className="input-field"
          value={dateRange.startDate}
          onChange={e => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-400 text-sm mb-1">To Date</label>
        <input
          type="date"
          className="input-field"
          value={dateRange.endDate}

          onChange={e => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-400 text-sm mb-1">Min Amount</label>
        <input
          type="number"
          className="input-field"
          value={amountRange.min}
          onChange={e => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-400 text-sm mb-1">Max Amount</label>
        <input
          type="number"
          className="input-field"
          value={amountRange.max}
          onChange={e => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
        />
      </div>

      <div className="md:col-span-2 flex flex-col gap-2">
        <button
          onClick={() => {
            setDateRange({ startDate: "", endDate: "" });
            setAmountRange({ min: "", max: "" });
          }}
          className="w-full bg-gray-700 text-white py-2 rounded mt-2 hover:bg-gray-600 transition"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
