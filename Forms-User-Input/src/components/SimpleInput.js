import React,{useState, useEffect} from 'react';
import useInput from '../hooks/use-input';
const SimpleInput = (props) => {
  //const[enteredName, setEnteredName]=useState('');
  // const[enteredNameTouched, setEnteredNameTouched]=useState(false);
  // const[enteredEmail, setEnteredEmail]=useState('');
  // const[enteredMailTouched, setEnteredMailTouched]=useState(false);
  const[formIsValid, setFormIsValid]=useState(false);

  const
  {
    value: enteredValue,
    hasError: nameInputHasError,
    isValid:enteredNameIsValid,
    valueChangeHandler: nameChangedHandler, 
    inputBlurHandler: nameBlurHander,
    reset:resetNameInput
  }=useInput(value=>value.trim() !== '');

  const
  {
    value: enteredMailValue,
    hasError: mailInputHasError,
    isValid:enteredMailIsValid,
    valueChangeHandler: mailChangedHandler, 
    inputBlurHandler: mailBlurHandler,
    reset:resetMailInput
  }=useInput(value=>value.trim()!=='' && value.includes('@') && !value.includes(' '));
  //Destructuring return object of useInput, and give them allies.

  //const enteredNameIsValid= enteredName.trim() !== '';
  //const nameInputIsInvalid=!enteredNameIsValid && enteredNameTouched;
  //const emailIsValid=enteredEmail.trim()!=='' && enteredEmail.includes('@') && !enteredEmail.includes(' ');
 // const emailInputIsInvalid=!emailIsValid && enteredMailTouched;
 
  useEffect(()=>{
    if(enteredNameIsValid && enteredMailIsValid){
      setFormIsValid(true);
    }else{
      setFormIsValid(false);
    }
  },[enteredNameIsValid, enteredMailIsValid]);

  // const nameBlurHandler=(event)=>{
  //   setEnteredNameTouched(true);
  // }
  // const emailBlurHandler=(event)=>{
  //   setEnteredMailTouched(true);
  // }

  // const nameInputChangeHandler=(event)=>{
  //   setEnteredName(event.target.value);
  // }
  // const emailInputChangeHandler=(event)=>{
  //   setEnteredEmail(event.target.value);
  // }
  
  const formSubmitHandler=(event)=>{
    event.preventDefault();
    if(!enteredNameIsValid && !enteredMailIsValid){
      return;
    }
    console.log(enteredValue);
    console.log(enteredMailValue);
    resetNameInput();
    resetMailInput();
  }
  

  const nameInputClasses= nameInputHasError ? 'form-control invalid': 'form-control';
  const emailInputClasses= mailInputHasError ? 'form-control invalid': 'form-control';
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={enteredValue} onBlur={nameBlurHander} onChange={nameChangedHandler}/>
        {nameInputHasError && <p className='error-text'>You did'nt enter any name,Please enter a name</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your E-mail</label>
        <input type='text' id='email' value={enteredMailValue} onBlur={mailBlurHandler} onChange={ mailChangedHandler}/>
        {mailInputHasError && <p className='error-text'>E-mail is invalid.Please enter appropriate e-mail.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
