import React,{useContext, useState, useEffect}from 'react';
import classes from './Auth.module.css';
import { AuthContext } from '../context/auth-context';
import { NavLink } from 'react-router-dom';
const Auth = props => {
  const[isSign, setIsSign]=useState(false)
  const{isAuth, openSubs, createAccount, login, logout,setUserInformation, userInformation}=useContext(AuthContext);
 
  // const subscribeHandler=(newUserInfo)=>{
  //   setUserInformation((prewUser)=>{
  //     return [...prewUser, {id:Math.random().toString(),...newUserInfo}] 
  //   }); 
  // }
  useEffect(()=>{
    fetch('https://task-manager-864b5-default-rtdb.firebaseio.com/userInfo.json')
      .then( response => {return response.json()})
      .then( responseData => {
          const loadedUsers=[];
          for(const key in responseData){
              loadedUsers.push({
                  id:key,
                  username:responseData[key].username,
                  useremail:responseData[key].useremail,
                  password:responseData[key].password
              });
          }
         setUserInformation(loadedUsers);
    })
    console.log("USER INFORMATION IN AUTH WOrKS!!!", userInformation);
  }, []);
  return (
    <div className={classes.auth}>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <div>
        <NavLink to='/UserLogin'>
         <button className={classes.button} >Log In</button>
         </NavLink>
        </div>
        <div>
        <NavLink to='/createAccount'>
          <button className={classes.button}>Sign In</button>
        </NavLink>
        </div>
    </div>
  );
};

export default Auth;
