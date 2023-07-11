import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "../features/transactions/transactionSlice";

export const store = configureStore({
    reducer: {
        transaction: transactionSlice,
    }
})