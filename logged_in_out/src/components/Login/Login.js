import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { useReducer } from 'react/cjs/react.development';

const emailReducer=(state,action)=>{
  if(action.type==='USER_INPUT'){
    return{value:action.val, isValid:action.val.includes('@')}
  }
  if(action.type==='INPUT_BLUR'){
    return{value: state.value, isValid:state.value.includes('@')}
  }
}

const passwordReducer=(state,action)=>{
  //state is the last snapshot of action
  if(action.type==='USER_PASSWORD'){
    return {value:action.val, isValid:action.val.trim().length > 6}
  }
  if(action.type==='PASSWORD_VALIDITY'){
    return {value:state.value, isValid:state.value.trim().length > 6}
  }
}

const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //REDUCER FOR EMAİL HERE
  const [emailState, dispatchEmail]=useReducer(emailReducer,{value:'', isValid:false})

  //REDUCER FOR PASSWORD
  const[passwordState, dispatchPassword]=useReducer(passwordReducer,{value:'', isValid:false})

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

//Email
  const emailChangeHandler = (event) => {
    
    dispatchEmail({type:'USER_INPUT', val:event.target.value});
    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'});
  };





  //Password
  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_PASSWORD', val:event.target.value});
    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };


  const validatePasswordHandler = () => {
    dispatchPassword({type:'PASSWORD_VALIDITY'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.isValid, passwordState);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
