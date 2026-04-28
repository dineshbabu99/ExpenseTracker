import {createSlice} from '@reduxjs/toolkit'
import { mockExpenses } from '../data/mockExpence'
import type { Expense } from '../types/expense'



const initialState = {
   items: mockExpenses as Expense[],
   error: null,
   loading: false
   
}

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            const newExpense: Expense ={
                id: (state.items.length + 1).toString(),
                ...action.payload,
                userId: 'user1',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()    
            }
            state.items.push(newExpense)
        }, 
        updateExpense: (state, action) => {
            const { id, ...updatedData } = action.payload
            const index = state.items.findIndex(expense => expense.id === id)
            if (index !== -1) {
                state.items[index] = { ...state.items[index], ...updatedData, updatedAt: new Date().toISOString() }
            }
        },
        deleteExpense: (state, action) => {
            state.items = state.items.filter(expense => expense.id !== action.payload)
        },
        setExpenses: (state, action) => {
            state.items = action.payload
        },
        filterByCategory: (state, action)=>{
            state.items = state.items.filter(expense => expense.category === action.payload);
        },
        filterByStatus: (state, action)=>{
            state.items = state.items.filter(expense => expense.status === action.payload);
        },
        filterByPriority: (state, action)=>{
            state.items = state.items.filter(expense => expense.priority === action.payload);
        },
        filterByDateRange: (state, action)=>{
            const { startDate, endDate } = action.payload
            state.items = state.items.filter(expense => {
                const expenseDate = new Date(expense.date)
                return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate)
            })
        }

    }
})

export const { addExpense, updateExpense, deleteExpense, setExpenses, filterByCategory, filterByStatus, filterByPriority, filterByDateRange } = expenseSlice.actions

export default expenseSlice.reducer