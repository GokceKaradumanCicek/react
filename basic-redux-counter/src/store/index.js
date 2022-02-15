import { createStore } from "redux";

const counterReducer=(state={counter:0}, action)=>{
    switch(action.type){
        case 'INC':
            return{ counter: state.counter +1 };
        case 'DEC':
            return{ counter: state.counter -1};
        default:
            return state;
    }
}
const store=createStore(counterReducer);
export default store;