import { useSelector, useDispatch} from "react-redux";
const Counter =()=>{
    const counter=useSelector(state=>state.counter);
    const dispatch=useDispatch();

    const incrementHandler=()=>{
        dispatch({type:'INC'})
    }
    const decrementHandler=()=>{
        dispatch({type:'DEC'})
    }
    return(<main>
        <h1>Redux Counter</h1>
        <div>{counter}</div>
        <div>
            <button className="button" onClick={incrementHandler}></button>
            <button className="button" onClick={decrementHandler}></button>
        </div>
    </main>)

}
export default Counter;