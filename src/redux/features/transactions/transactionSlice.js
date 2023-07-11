import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addTransaction, deleteTransaction, editTransaction, getTransaction } from "./transactionAPI";

//initial state
const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: "",
    editing: {},
}

//async thunk
export const fetchTransaction = createAsyncThunk("transactions/fetchTransaction",
    async () => {
        const transactions = await getTransaction();
        return transactions;
    });
export const createTransaction = createAsyncThunk("transactions/createTransaction",
    async (data) => {
        const transaction = await addTransaction(data);
        return transaction;
    });
export const updateTransaction = createAsyncThunk("transactions/updateTransaction",
    async ({ id, data }) => {
        const transaction = await editTransaction(id, data);
        return transaction;
    })
export const removeTransaction = createAsyncThunk("transactions/removeTransaction",
    async (id) => {
        const transaction = await deleteTransaction(id);
        return transaction;
    });

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        editTrans: (state, action) => {
            state.editing = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransaction.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.transactions = [];
                state.error = action.error?.message;
            })
            .addCase(createTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.transactions.push(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.error = action.error?.message;
            })
            .addCase(updateTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                console.log(action)
                state.isLoading = false;
                state.error = false;
                const getIndex = state.transactions.findIndex(t => t.id === action.payload.id);
                state.transactions[getIndex] = action.payload;
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.error = action.error?.message;
            })
            .addCase(removeTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                console.log(action)
                state.isLoading = false;
                state.error = false;
                state.transactions = state.transactions.filter(t => t.id !== action.meta.arg);
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.error = action.error?.message;
            })
    }
})
export default transactionsSlice.reducer;
export const { editTrans } = transactionsSlice.actions;