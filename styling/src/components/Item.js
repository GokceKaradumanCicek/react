import React, { useState } from "react";
import Button from "../UI/Button";
// import styled from "styled-components";
import style from "./Item.module.css";

// const FormControl = styled.div`
//   margin: 0.5rem 0;

//   & label {
//     font-weight: bold;
//     display: block;
//     margin-bottom: 0.5rem;
//     color: ${(props)=>(props.inValid ? 'red':'black')}
//   }

//   & input {
//     display: block;
//     width: 100%;
//     border: 1px solid ${(props) => (props.inValid? 'red' : '#ccc')};
//     background: #ffd7d7;
//     font: inherit;
//     line-height: 1.5rem;
//     padding: 0 0.25rem;
//   }

//   & input:focus {
//     outline: none;
//     background: #fad0ec;
//     border-color: #8b005d;
//   }
// `;
function Item(props) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const InputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };
  return (
    <form onSubmit={submitHandler}>
      <div className={style[form-control]}>
        <label>Course Goal</label>
        <input type="text" onChange={InputChangeHandler} />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
}
export default Item;
