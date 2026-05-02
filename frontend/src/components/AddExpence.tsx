import { useDispatch } from "react-redux"
import { addExpense } from "../slice/expenseSlice"
import { categories } from "../data/mockExpence"

export function AddExpense() {
    const dispatch = useDispatch();

const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const amount = parseFloat(formData.get("amount") as string);
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const description = formData.get("note") as string;

    if (!amount || isNaN(amount)) {
      alert("Enter valid amount");
      return;
    }

    if (!category) {
      alert("Select category");
      return;
    }
    if (!date) {
      alert("Select date");
      return;
    }

    const expenseData = {
      amount,
      category,
      date: date || new Date().toISOString(),
      description: description || "No description",
    };

    dispatch(addExpense(expenseData));

    form.reset();
  };



    return (
         <div className="addexpense-form">
            <h3 className="text-2xl font-bold mb-4">Add New Expense</h3>
            <form className="p-4 rounded-lg" onSubmit={handleAddExpense}>
                <div className="mb-4">
                    <label className="block mb-2">Amount (₹)</label>
                    <input type="number" name="amount" className="w-full p-2 rounded input-field" placeholder="0.00" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Category</label>
                <select name="category" className="w-full p-2 rounded input-field">
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Date</label>
                    <input type="date" name="date" value={new Date().toISOString().split('T')[0]} className="w-full p-2 rounded input-field" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Note</label>
                    <input type="text" name="note" className="w-full p-2 rounded input-field" placeholder="What did you spend on?" />
                </div>
<button type="submit"  className="submit-btn">
  + Add Expense
</button>
            </form>

        </div>
    )
}