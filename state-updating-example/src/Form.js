import React, { useState } from 'react';
import classes from './Form.module.css';

const Login = (props) => {
  
  const formState=useState({email:'', password:''});

  return (
      <form>
        <div className={classes.control}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState[0].email}
            onChange={
                event =>{
                    const newEmail=event.target.value;
                    formState[1]((prevState) => ({email: newEmail, password:prevState.password}))
                }
            }
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formState[0].password}
            onChange={
                event=>{
                    const newPassword=event.target.value;
                    formState[1]( (prevState) => ({email:prevState.email, password:newPassword}) )
                }
            }
          />
        </div>
        <div className={classes.actions}>
          <button type="submit" className={classes.btn}>
            Login
          </button>
        </div>
      </form>
  );
};

export default Login;
