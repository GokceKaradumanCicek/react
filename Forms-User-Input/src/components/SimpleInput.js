import React,{useState, useEffect} from 'react';
const SimpleInput = (props) => {
  const[enteredName, setEnteredName]=useState('');
  const[enteredNameTouched, setEnteredNameTouched]=useState(false);
  const[enteredEmail, setEnteredEmail]=useState('');
  const[enteredMailTouched, setEnteredMailTouched]=useState(false);
  const[formIsValid, setFormIsValid]=useState(false);

  const enteredNameIsValid= enteredName.trim() !== '';
  const nameInputIsInvalid=!enteredNameIsValid && enteredNameTouched;
  const emailIsValid=enteredEmail.trim()!=='' && enteredEmail.includes('@') && !enteredEmail.includes(' ');
  const emailInputIsInvalid=!emailIsValid && enteredMailTouched;
 
  useEffect(()=>{
    if(enteredNameIsValid && emailIsValid){
      setFormIsValid(true);
    }else{
      setFormIsValid(false);
    }
  },[enteredNameIsValid, emailIsValid]);

  const nameBlurHandler=(event)=>{
    setEnteredNameTouched(true);
  }
  const emailBlurHandler=(event)=>{
    setEnteredMailTouched(true);
  }

  const nameInputChangeHandler=(event)=>{
    setEnteredName(event.target.value);
  }
  const emailInputChangeHandler=(event)=>{
    setEnteredEmail(event.target.value);
  }
  
  const formSubmitHandler=(event)=>{
    event.preventDefault();
    setEnteredNameTouched(true);
    setEnteredMailTouched(true);
    if(!enteredNameIsValid && !emailIsValid){
      return;
    }
    console.log(enteredName);
    console.log(enteredEmail);
    setEnteredName('');
    setEnteredEmail('');
    setEnteredNameTouched(false);
    setEnteredMailTouched(false);
  }
  

  const nameInputClasses= nameInputIsInvalid ? 'form-control invalid': 'form-control';
  const emailInputClasses= emailInputIsInvalid ? 'form-control invalid': 'form-control';
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={enteredName} onBlur={nameBlurHandler} onChange={nameInputChangeHandler}/>
        {nameInputIsInvalid && <p className='error-text'>You did'nt enter any name,Please enter a name</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your E-mail</label>
        <input type='text' id='email' value={enteredEmail} onBlur={emailBlurHandler} onChange={emailInputChangeHandler}/>
        {emailInputIsInvalid && <p className='error-text'>E-mail is invalid.Please enter appropriate e-mail.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
