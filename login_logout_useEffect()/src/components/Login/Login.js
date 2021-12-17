import React, { useState ,useEffect, useReducer, useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer=(state,action)=>{
  if (action.type==='USER_INPUT'){
    return {value:action.val, isValid:action.val.includes('@')}
  }
  if(action.type==='INPUT_BLUR'){
    return{value: state.value, isValid:state.value.includes('@')}
    // state is the last snapshot of action
  }
  return {value:'', isValid: false}
}
 const passwordReducer=(state, action)=>{
  if (action.type==='USER_PASSWORD'){
    return {value:action.val, isValid:action.val.trim().length > 6}
  }
  if(action.type==='PASSWORD_VALIDITY'){
    return{value: state.value, isValid:state.value.trim().length > 6}
    // state is the last snapshot of action
  }
  return {value:'', isValid: false}
 }

const Login = (props) => {
  const AuthCtx=useContext(AuthContext);
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const[emailState, dispatchEmail]=useReducer(emailReducer, {value:'', isValid:null} );
  const[passwordState, dispatchPassword]=useReducer(passwordReducer, {value:'', isValid:null});
  const {isValid: emailIsValid}=emailState;
  const {isValid: passwordIsValid}=passwordState;
  useEffect(()=>{
    const identifier= setTimeout(()=>{
      console.log("UseEffect Runs!");
      setFormIsValid(
        emailIsValid && passwordIsValid
    );
    }, 1000);

    return(()=>{
      console.log("Timeout cleaned!")
      clearTimeout(identifier);
    });
  }, [emailIsValid, passwordIsValid, setFormIsValid]);

   const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val:event.target.value});
    setFormIsValid(
      emailState.isValid && passwordState.isValid
     );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})
  };

   const passwordChangeHandler = (event) => {
     dispatchPassword({type:'USER_PASSWORD', val:event.target.value})
     setFormIsValid(
       passwordState.isValid && emailState.isValid
     );
   };


  const validatePasswordHandler = () => {
    dispatchPassword({type:'PASSWORD_VALIDITY'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    AuthCtx.onLogin(emailState.value, passwordState.value);
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
