import React,{useState} from 'react';
const useTest=(validationCheckFunction)=>{
    const[enteredValue, setEnteredValue]=useState('');
    const[isTouch, setIsTouch]=useState(false);
    const isValid=validationCheckFunction(enteredValue);
    const hasError=!isValid && isTouch;

    const changeHandler=(event)=>{
        setIsTouch(true);
        setEnteredValue(event.target.value);
    }
    const blurHandler=(event)=>{
        setIsTouch(true);
    }
    const reset=()=>{
        setEnteredValue('');
        setIsTouch(false);
    }
    return{
        value:enteredValue,
        error:hasError,
        changeHandler,
        blurHandler,
        validation:isValid,
        reset,
    }
}
export default useTest;