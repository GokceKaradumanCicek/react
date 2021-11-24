import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./AddUser.module.css"
import React, {useState} from 'react';
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
const AddUser = props=>{
    const [enteredUserName, setUserName]=useState('');
    const [enteredAge, setEnteredAge]=useState('');
    const[enteredSurname, setSurName]=useState('');
    const[error, setError]=useState();
    const AddUserHandler=(event)=>{
      event.preventDefault();
      if(enteredUserName.trim().length === 0 || enteredAge.trim().length === 0 ||enteredSurname.trim().length===0){
        setError({
            title:'INVALID INPUT!',
            message:'Please fill all content in the form'
        })  
        return;
      }
      if(+enteredAge<1){
        setError({
            title:'INVALID INPUT!',
            message:'Please enter a valid age'
        })  
        return;
      }
      //console.log(enteredUserName, enteredAge);
      props.onAddUser(enteredUserName,enteredSurname,enteredAge);
      setUserName('');
      setEnteredAge('');
      setSurName('');
    }
    const userNameChangeHandler=(event)=>{
        setUserName(event.target.value);
    }
    const surNameChangeHandler=(event)=>{
        setSurName(event.target.value);
    }
    const ageChangeHandler=(event)=>{
        setEnteredAge(event.target.value);
    }
    const setErrorNull=()=>{
        setError(null);
    }
return(
    <Wrapper>
    {error && <ErrorModal title={error.title} message={error.message} onConfirm={setErrorNull}></ErrorModal>}
    <Card className={classes.input}>
    <form onSubmit={AddUserHandler}>
        <label htmlFor="username">User Name:</label>
        <input id="username" type="text" value={enteredUserName} onChange={userNameChangeHandler}></input>
        <label htmlFor="surname">User Surname:</label>
        <input id="surname" type="text" value={enteredSurname} onChange={surNameChangeHandler}></input>
        <label htmlFor="age">Age(Year)</label>
        <input id="age" type="number" value={enteredAge} onChange={ageChangeHandler}></input>
        <Button type="submit">Add User</Button>
    </form>
    </Card>
    </Wrapper>
)

}
export default AddUser;