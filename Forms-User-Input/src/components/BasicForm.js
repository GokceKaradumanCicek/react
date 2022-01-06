import useTest from "../hooks/use-test-input";
import React,{useState} from 'react';
const BasicForm = (props) => {
  const[submissionError, setSubmissionError]=useState(false);
  const{
    value:nameValue,
    error:nameHasError,
    changeHandler:nameChangeHandler, 
    blurHandler:nameBlurHandler,
    validation:nameValid,
    reset:nameReset,
  }=useTest(name=> name.trim().length !=='' && !name.includes(' '));

  const{
    value:surnameValue,
    error:surnameHasError,
    changeHandler:surnameChangeHandler, 
    blurHandler:surnameBlurHandler,
    validation:surnameValid,
    reset:surnameReset
  }=useTest(name=> name.trim() !=='' && !name.includes(' '));

  const{
    value:emailValue,
    error:emailHasError,
    changeHandler:emailChangeHandler, 
    blurHandler:emailBlurHandler,
    validation:emailValid,
    reset:emailReset
  }=useTest(name=> name.trim() !=='' && !name.includes(' ') && name.includes('@'));


  const formSubmitHandler=(event)=>{
    event.preventDefault();
    if(!nameValid || !surnameValid || !emailValid){
      return;
    }
    console.log(nameValue);
    console.log(surnameValue);
    console.log(emailValue);
    nameReset();
    surnameReset();
    emailReset();
  }

  const submissionErrorHandler=()=>{
    if(nameHasError || surnameHasError || emailHasError){
      setSubmissionError(true);
    }
  }
  
  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className='form-control'>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' value={nameValue} onChange={nameChangeHandler} onBlur={nameBlurHandler} />
          {nameHasError && <p className="error-text">Please enter a valid name.</p>}
        </div>
        <div className='form-control'>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' value={surnameValue} onChange={surnameChangeHandler} onBlur={surnameBlurHandler}/>
          {surnameHasError && <p className="error-text">Please enter a valid surname.</p>}
        </div>
      </div>
      <div className='form-control'>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' value={emailValue} onChange={emailChangeHandler} onBlur={emailBlurHandler}/>
        {emailHasError && <p className="error-text">Please enter a valid email.</p>}
      </div>
      <div className='form-actions'>
        <button onClick={submissionErrorHandler} >Submit</button>
        {submissionError && <p className="error-text">Submission is failed.Please review your enters!</p>}
      </div>
    </form>
  );
};

export default BasicForm;
