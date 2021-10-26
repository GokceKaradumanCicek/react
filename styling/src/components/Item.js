import "./Item.css";
import React, { useState } from "react";
import Button from "../UI/Button";
function Item(props) {
  const [enteredValue, setEnteredValue] = useState("");
  const[isValid, setIsValid]=useState(true);
  const InputChangeHandler = (event) => {
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
      <div className="form-control">
        <label  style={{color: !isValid? 'red': 'black' }}>Course Goal</label>
        <input type="text" onChange={InputChangeHandler} />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
}
export default Item;
