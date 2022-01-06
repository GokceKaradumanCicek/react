import React,{ useReducer} from "react";

const initialInputState={
    value:'',
    isTouched:false
}

const inputStateReducer=(state,action)=>{
    if(action.type ==='INPUT'){
        return {value: action.value, isTouched:state.isTouched}
    }
    if(action.type ==='BLUR'){
        return {value: state.value, isTouched:true}
    }
    if(action.type ==='RESET'){
        return {value: '', isTouched:false}
    }
    return initialInputState;
}

const useInput=(validateValue)=>{ //validateValue is a function
    const[inputState, dispatch]=useReducer(inputStateReducer, initialInputState);

  //const[enteredValue, setEnteredValue]=useState('');
  //const[isTouched, setIsTouched]=useState(false);

  //const valueIsValid= enteredValue.trim() !== '';
  const valueIsValid= validateValue(inputState.value);
  const hasError=!valueIsValid && inputState.isTouched;
  const valueChangeHandler=(event)=>{
      //setEnteredValue(event.target.value);
      dispatch({type: 'INPUT', value:event.target.value})
  }
  const inputBlurHandler=(event)=>{
      //setIsTouched(true);
      dispatch({type: 'BLUR'})
  }
  const reset=()=>{
    dispatch({type: 'RESET'});
      //setEnteredValue('');
      //setIsTouched(false);
  }
  return{
      value:inputState.value,
      hasError:hasError,
      isValid:valueIsValid,
      valueChangeHandler,
      inputBlurHandler,
      reset
  }

}
export default useInput;