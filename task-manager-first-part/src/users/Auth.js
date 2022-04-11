import React,{useContext, useState}from 'react';
import classes from './Auth.module.css';
import { AuthContext } from '../context/auth-context';
import UserSign from './UserSign';
import { NavLink } from 'react-router-dom';
const Auth = props => {
  const[isSign, setIsSign]=useState(false)
  const[userInformation, setUserInformation]=useState([]);
  const{isAuth, openSubs, createAccount, login, logout}=useContext(AuthContext);
  const loginHandler = () => {
      login();
  };
  
  const subscribeHandler=(newUserInfo)=>{
    setUserInformation((prewUser)=>{
      return [...prewUser, {id:Math.random().toString(),...newUserInfo}] 
    }); 
  }
  console.log("USER of Auth:", userInformation);

  return (
    <div className={classes.auth}>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <div>
        <NavLink to='/UserLogin'>
         <button className={classes.button} onClick={loginHandler}>Log In</button>
         </NavLink>
        </div>
        <div>
        <NavLink to='/createAccount'>
          <button className={classes.button} onClick={()=>{createAccount()}}>Sign In</button>
        </NavLink>
        </div>
    </div>
  );
};

export default Auth;
