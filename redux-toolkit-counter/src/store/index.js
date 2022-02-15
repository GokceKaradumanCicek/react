import { createSlice, configureStore } from "@reduxjs/toolkit";
const counterSlice=createSlice({
    name:'counterSlice',
    initialState:{counter:0,showCounter:true},
    reducers:{
        increment (state,action){
            state.counter= state.counter+action.payload
        },
        decrement (state,action){
            state.counter= state.counter-action.payload
        },
        toggle(state){
            state.showCounter=!state.showCounter
        }
    }
});

const store=configureStore({
    reducer:counterSlice.reducer //Get counterSlice's reducer
});

export const counterActions=counterSlice.actions;
export default store;