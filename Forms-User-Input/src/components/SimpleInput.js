import React,{useRef, useState} from 'react';
const SimpleInput = (props) => {
  const nameInputRef= useRef();

  const formSubmitHandler= event=>{
    event.preventDefault();
    const enteredValue=nameInputRef.current.value;
    console.log(enteredValue);
  }
  return (
    <form onSubmit={formSubmitHandler}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
