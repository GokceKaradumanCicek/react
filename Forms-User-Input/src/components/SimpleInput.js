import React,{useRef, useState, useEffect} from 'react';
const SimpleInput = (props) => {
  const nameInputRef= useRef();
  const[enteredNameIsValid, setEnteredNameIsValid]=useState(false);
  const[enteredNameTouched, setEnteredNameTouched]=useState(false);

  useEffect(()=>{
    if(enteredNameIsValid){
      console.log("Hey, your input is valid!");
    }
  },[enteredNameIsValid]);


  const formSubmitHandler= event=>{
    event.preventDefault();
    setEnteredNameTouched(true);
    const enteredValue=nameInputRef.current.value;
    if(enteredValue.trim()=== ''){
      setEnteredNameIsValid(false);
      return;
    }
    setEnteredNameIsValid(true);
    console.log(enteredValue);
  }
  
  const nameInputIsInvalid=!enteredNameIsValid && enteredNameTouched;
  const nameInputClasses= nameInputIsInvalid ? 'form-control invalid': 'form-control';
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {nameInputIsInvalid && <p className='error-text'>You did'nt enter any name,Please enter a name</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
