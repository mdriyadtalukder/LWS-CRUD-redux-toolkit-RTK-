import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const axisTance = axis.create({
    baseURL: "http://localhost:9000/"
})
export default axisTance;

export const getT = async () => {
    const response = await axisTance.get('/t');
    return response.data;
}
export const addT = (data) => {
    const response = await axisTance.post("/t", data);
    return response.data;
}
export const upT = async (id, data) => {
    const response = await axisTance.put(`/t/${id}`, data);
    return response.data;
}
export const del = async (id) => {
    const response = await axisTance.delete(`/t/${id}`);
    return response.data;
}
const initialState = {
    t: [],
    isError: false,
    isLoading: false,
    error: "",
    edit:{}
}
export const fetchT = createAsyncThunk('t/fetchT',
    async () => {
        const t = await getT();
        return t;
    }
)
export const adT = createAsyncThunk("t/adT",
    async (data) => {
        const t = await addT(data);
        return t;

    })
export const upsT = createAsyncThunk("t/upsT",
    async ({ id, data }) => {
        const t = await upT(id, data);
        return t;
    })
export const dels = createAsyncThunk('t/dels',
    async (id) => {
        const t = await del(id);
        return t;
    })
const tSlice=createSlice({
    name:'t',
    initialState,
    reducers:{
      et:(state,action)=>{
        state.edit=action.payload;
      }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchT.pending,(state)=>{
            state.isError=false;
            state.isLoading=true
        })
        .addCase(fetchT.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.t=action.payload;
        })
        .addCase(fetchT.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.t=[];
            state.error=action.error?.message;
        })
        .addCase(adT.fulfilled,(state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.t.push(action.payload);
        })
        .addCase(upsT.fulfilled,(state,action)=>{
            const inde=state.t.findIndex(t=>t.id===action.payload.id);
            state.t[inde]=action.payload;
        })
        .addCase(dels.fulfilled,(state,action)=>{
            const ts=state.t.filter(t=>t.id!==action.meta.arg)
        })
    }
})
export default tSlice.reducer;
export const {et}=tSlice.actions

const store=configureStore({
    reducer{
        trns:tSlice;
    }
})

