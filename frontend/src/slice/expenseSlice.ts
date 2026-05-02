import {createSlice} from '@reduxjs/toolkit'
import type { Expense } from '../types/expense'




const LocalStorageData = (): Expense[] => {
  try {
    const data = localStorage.getItem("expenses");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load from localStorage", e);
    return [];
  }
};

const saveToLocalStorage = (items: Expense[]) => {
  try {
    localStorage.setItem("expenses", JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
};






const initialState = {
  items: LocalStorageData(),
  error: null,
  loading: false
};











export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            const newExpense: Expense ={
                id: (state.items.length + 1),
                ...action.payload,
                createdAt: new Date().toISOString(),
            }
            state.items.push(newExpense)
            saveToLocalStorage(state.items);
            // console.log("Expense added:", newExpense) // Debug log
        }, 
       
 deleteExpense: (state, action) => {
  state.items = state.items.filter(e => e.id !== action.payload);
  saveToLocalStorage(state.items); 
},

        filterByCategory: (state, action)=>{
            // console.log("Filtering by category:", action.payload)
            if (!action.payload) {
                state.items = state.items
                return
            }
            state.items = state.items.filter(expense => expense.category === action.payload);
        },

  
    }
})

export const { addExpense, deleteExpense, filterByCategory } = expenseSlice.actions

export default expenseSlice.reducer

