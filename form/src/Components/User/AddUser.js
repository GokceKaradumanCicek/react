import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./AddUser.module.css"
import React, {useState, useRef} from 'react';
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
const AddUser = props=>{
   // const [enteredUserName, setUserName]=useState('');
   // const [enteredAge, setEnteredAge]=useState('');
   // const[enteredSurname, setSurName]=useState('');
    const nameInputRef=useRef();
    const surnameInputRef=useRef();
    const ageInputRef=useRef();

    const[error, setError]=useState();

    const AddUserHandler=(event)=>{
      event.preventDefault();
      
      console.log(nameInputRef);
      console.log(surnameInputRef);
      console.log(ageInputRef);

      const nameInputRefValue=nameInputRef.current.value;
      const surnameInputRefValue=surnameInputRef.current.value;
      const ageInputRefValue=ageInputRef.current.value;

      if(nameInputRefValue.trim().length === 0 || ageInputRefValue.trim().length === 0 ||surnameInputRefValue.trim().length===0){
        setError({
            title:'INVALID INPUT!',
            message:'Please fill all content in the form'
        })  
        return;
      }
      if(+ageInputRefValue<1){
        setError({
            title:'INVALID INPUT!',
            message:'Please enter a valid age'
        })  
        return;
      }
      //console.log(enteredUserName, enteredAge);
      //props.onAddUser(enteredUserName,enteredSurname,enteredAge);
      //setUserName('');
      //setEnteredAge('');
      //setSurName('');
      props.onAddUser(nameInputRefValue,surnameInputRefValue,ageInputRefValue);
      nameInputRef.current.value='';
      surnameInputRef.current.value='';
      ageInputRef.current.value='';
    }
   
   // const userNameChangeHandler=(event)=>{
     //   setUserName(event.target.value);
    //}
    //const surNameChangeHandler=(event)=>{
      //  setSurName(event.target.value);
    //}
    //const ageChangeHandler=(event)=>{
      //  setEnteredAge(event.target.value);
    //}
    const setErrorNull=()=>{
        setError(null);
    }
return(
    <Wrapper>
    {error && <ErrorModal title={error.title} message={error.message} onConfirm={setErrorNull}></ErrorModal>}
    <Card className={classes.input}>
    <form onSubmit={AddUserHandler}>
        <label htmlFor="username">User Name:</label>
        <input id="username" type="text" ref={nameInputRef}></input>
        <label htmlFor="surname">User Surname:</label>
        <input id="surname" type="text"  ref={surnameInputRef}></input>
        <label htmlFor="age">Age(Year)</label>
        <input id="age" type="number" ref={ageInputRef}></input>
        <Button type="submit">Add User</Button>
    </form>
    </Card>
    </Wrapper>
)

}
export default AddUser;