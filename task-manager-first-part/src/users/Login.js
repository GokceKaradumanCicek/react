import React, { useEffect } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useContext, useState } from "react";
import { AuthContext } from '../context/auth-context';
import { NavLink } from "react-router-dom";

const Login= React.memo((props)=>{
    const [user, setUser]=useState({username:'', password:''});
    const [loginSuccessfull, setLoginSuccessfull]=useState(false);
    const [accountNotFound, setAccountNotFound]=useState(false);
    const{userInformation, login, loginUserInfo,setUserIdtoContext, makeloginSuccessfull}=useContext(AuthContext);

    const submitHandler=(event)=>{
        event.preventDefault();
        const index=userInformation.findIndex(u=>u.username===user.username && u.password===user.password);
        console.log("USER INFO:", userInformation);
        if(index>=0){
            console.log("Can be access to tasks");
            const userId=userInformation[index].id;
            setUserIdtoContext(userId);
            setLoginSuccessfull(true);
            login(user);
        }else{
            setAccountNotFound(true);
        }
    }
    return(
    <Card>
            <div className="backdrop" onClick={props.onClose} />
            <div className="login-modal">
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                 <div>
                       <Input id="username" label="User Name:" value={user.username} onChange={(event)=>{const newName=event.target.value;
                          setUser((prev)=>{return {username:newName,password:prev.password}});
                       }}></Input>
                 </div>
                 <div>
                       <Input type="password" id="password" label="Password:" value={user.password} onChange={(event)=>{const newPassword=event.target.value; 
                            setUser((prev)=>{return {username:prev.username,password:newPassword}});
                        }}></Input>
                 </div>
                 <div className="login-modal__actions">
                  {!loginSuccessfull && <Button type='submit' >Login</Button>}
                 </div>
                 <div className="login-modal__actions">
                  <NavLink to='/login'><Button>Close</Button></NavLink>
                 </div>
                 {(accountNotFound && !loginSuccessfull)&& <p>Invalid.Account is not found!</p>}
                 <div className="login-modal__actions">
                 {loginSuccessfull && <NavLink to='/tasks'> <Button onClick={()=>makeloginSuccessfull()}>Successful! Open your tasks.</Button></NavLink>}
                 </div>
                 
            </form>
            </div>
    </Card>
    )
})
export default Login;
