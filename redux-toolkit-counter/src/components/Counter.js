import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store";
const Counter=()=>{
    const dispatch=useDispatch();
    const counter=useSelector(state=>state.counter);
    const showCounter=useSelector(state=>state.showCounter);

    const incrementHandler=()=>{
        dispatch(counterActions.increment(1));
    }

    const decrementHandler=()=>{
        dispatch(counterActions.decrement(1));
    }
    const toggleHandler=()=>{
        dispatch(counterActions.toggle());
    }
    return(
        <main>
            <h1>REDUX COUNTER</h1>
            {showCounter && <div>{counter}</div>}
            <div>
                <button className="button" onClick={incrementHandler}>INCREASE</button>
                <button className="button" onClick={decrementHandler}>DECREASE</button>
                <button className="button" onClick={toggleHandler}>TOGGLE</button>
            </div>
        </main>
    )
}
export default Counter;