import React,{useState, useEffect} from 'react';
const SimpleInput = (props) => {
  const[enteredName, setEnteredName]=useState('');
  const[enteredNameTouched, setEnteredNameTouched]=useState(false);
  const[formIsValid, setFormIsValid]=useState(false);

  const enteredNameIsValid= enteredName.trim() !== '';
  //if enteredName.trim() !=='' is true,then enteredNameIsValid is true.
  const nameInputIsInvalid=!enteredNameIsValid && enteredNameTouched;
 
  useEffect(()=>{
    if(enteredNameIsValid){
      setFormIsValid(true);
    }else{
      setFormIsValid(false);
    }
  },[enteredNameIsValid]);

  const nameInputChangeHandler=(event)=>{
    setEnteredName(event.target.value);
  }

  const nameInputBlurHandler=event=>{
    setEnteredNameTouched(true);
  }
  
  const formSubmitHandler=(event)=>{
    event.preventDefault();
    setEnteredNameTouched(true);
    if(!enteredNameIsValid){
      return;
    }
    console.log(enteredName);
    setEnteredName('');
    setEnteredNameTouched(false);
  }
  

  const nameInputClasses= nameInputIsInvalid ? 'form-control invalid': 'form-control';
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={enteredName} onBlur={nameInputBlurHandler} onChange={nameInputChangeHandler}/>
        {nameInputIsInvalid && <p className='error-text'>You did'nt enter any name,Please enter a name</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
