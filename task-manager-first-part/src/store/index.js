import { createSlice, configureStore } from "@reduxjs/toolkit";
const doneOutNumberSlice=createSlice({
    name:'counterSlice',
    initialState:{doneNumber:0, outNumber:0},
    reducers:{
        done (state,action){
            state.doneNumber= action.payload
        },
        out (state,action){
            state.outNumber= action.payload
        },
    }
});

const store=configureStore({
    reducer:doneOutNumberSlice.reducer //Get doneOutNumberSlice's reducer
});

export const doneOutNumberActions=doneOutNumberSlice.actions;
export default store;