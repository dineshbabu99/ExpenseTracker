import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { mockExpenses, categories } from "../data/mockExpence";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
ChartJS.register(ArcElement, Tooltip, Legend);



export function Graph() {
  



const expenses = useSelector((state: RootState) => state.expense.items);

const total = expenses.reduce(
  (sum, e) => sum + Number(e.amount || 0),
  0
);

const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart: any) => {
    const { width, height, ctx } = chart;

    ctx.save();

    ctx.font = "bold 20px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(`₹${total}`, width / 2, height / 2 - 6);

    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#9ca3af";

    ctx.fillText("Total", width / 2, height / 2 + 12);

    ctx.restore();
  }
};

const expenseGraph = {
     labels: expenses.map(c => c.category),
   datasets: [
    {
      data: categories.map(cat =>
        expenses
          .filter(e => e.category === cat.id)
          .reduce((sum, e) => sum + e.amount, 0)
      ),
      backgroundColor: categories.map(c => c.color),
      borderWidth: 0,
      weight: 1
    }
  ]
};

const options = {
  plugins: {
    legend: {
      display: false 
    }
  },
   cutout: "65%",
};
const categoryTotals = categories.map(cat => {
  const total = expenses
  .filter(e => e.category === cat.id)
  .reduce((sum, e) => sum + e.amount, 0);
  
  return {
    ...cat,
    total
  };
});
const maxValue = Math.max(...categoryTotals.map(c => c.total), 1);
const visibleCategories = categoryTotals.filter(cat => cat.total > 0);

    return (
        
        <div className="graph-section">
            <h2 className="text-2xl font-bold mb-4">Graph</h2>
           <div className="graph-placeholder h-64 rounded-lg flex items-center justify-center">
  {expenses.length ? (
    <Doughnut data={expenseGraph} options={options} plugins={[centerTextPlugin]} />
  ) : (
    <p className="text-gray-500">No expenses to display</p>
  )}
</div>


    <div className="mt-6 space-y-3">
  {visibleCategories.length > 0 ? (
    visibleCategories.map(cat => (
      <div key={cat.id} className="flex items-center gap-3">

        <div className="w-24 flex items-center gap-2">
          <span>{cat.icon}</span>
          <span className="text-white text-sm">{cat.label}</span>
        </div>

        <div className="flex-1 h-1 bg-gray-700 rounded">
          <div
            className="h-1 rounded"
            style={{
              width: maxValue
                ? `${(cat.total / maxValue) * 100}%`
                : "0%",
              backgroundColor: cat.color
            }}
          ></div>
        </div>

        <div className="w-16 text-right text-sm text-white" style={{ color: cat.color }}>
          ₹{cat.total}
        </div>

      </div>
    ))
  ) : (
    <p className="text-center text-gray-500 text-sm py-6">
      📊 No categories found
    </p>
  )}
</div>
        </div>
    )
}