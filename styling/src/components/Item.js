import React, { useState } from "react";
import Button from "../UI/Button";
import styled from 'styled-components';

const FormControl=styled.div`
    margin: 0.5rem 0;
  
  &.label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  &.input {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
    line-height: 1.5rem;
    padding: 0 0.25rem;
  }
  
  & input:focus {
    outline: none;
    background: #fad0ec;
    border-color: #8b005d;
  }
  &.invalid input{
      border-color: red;
      background: rgb(216, 89, 89);
  }
  &.invalid label{
  color:red;    
} 

function Item(props) {
  const [enteredValue, setEnteredValue] = useState("");
  const[isValid, setIsValid]=useState(true);
  const InputChangeHandler = (event) => {
    if(event.target.value.trim().length>0){
        setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if(enteredValue.trim().length===0){
        setIsValid(false);
        return;
    }
    props.onAddGoal(enteredValue);
  };
  return (
    <form onSubmit={submitHandler}>
      <FormControl>
                  <label>Course Goal</label>
        <input type="text" onChange={InputChangeHandler} />
      </FormControl>
      <Button type="submit">Add Goal</Button>
    </form>
  );
}
export default Item;
