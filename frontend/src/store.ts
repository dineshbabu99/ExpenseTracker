import { configureStore } from "@reduxjs/toolkit";
import { expenseSlice } from "./slice/expenseSlice";


export const store = configureStore({
    reducer: {
        expense: expenseSlice.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch