import React,{useRef, useState} from 'react';
const SimpleInput = (props) => {
  const nameInputRef= useRef();
  const[enteredNameIsValid, setEnteredNameIsValid]=useState(true);


  const formSubmitHandler= event=>{
    event.preventDefault();
    const enteredValue=nameInputRef.current.value;
    if(enteredValue.trim()=== ''){
      setEnteredNameIsValid(false);
      return;
    }
    setEnteredNameIsValid(true);
    console.log(enteredValue);
  }

  const nameInputClasses= enteredNameIsValid ? 'form-control': 'form-control invalid';
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!enteredNameIsValid && <p className='error-text'>You did'nt enter any name,Please enter a name</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
