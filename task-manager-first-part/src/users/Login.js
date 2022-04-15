import React from "react";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useContext, useState } from "react";
import { AuthContext } from '../context/auth-context';
import { NavLink, useHistory } from "react-router-dom";

const Login= React.memo((props)=>{
    const [user, setUser]=useState({useremail:'', password:''});
    const [loginSuccessfull, setLoginSuccessfull]=useState(false);
    const [isTyping, setIsTyping]=useState(false);
    const [accountNotFound, setAccountNotFound]=useState(false);
    const{userInformation, login}=useContext(AuthContext);

    const history=useHistory();
    
    const submitHandler=(event)=>{
        event.preventDefault();
        setIsTyping(false);
        const index=userInformation.findIndex(u=>u.useremail===user.useremail && u.password===user.password);
        const userInfo=userInformation[index];
        
        if(index>=0){
            setLoginSuccessfull(true);
            try{
                login(userInfo.useremail, userInfo.password, userInfo.username, userInfo.id);
                history.push('/tasks');
                
            }catch(error){
                console.log("FAILED TO LOGIN.");
            }
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
                       <Input id="useremail" label="User Email:" value={user.useremail} onChange={(event)=>{const newName=event.target.value;
                        setIsTyping(true);
                          setUser((prev)=>{return {useremail:newName,password:prev.password}});
                       }}></Input>
                 </div>
                 <div>
                       <Input type="password" id="password" label="Password:" value={user.password} onChange={(event)=>{const newPassword=event.target.value; 
                           setIsTyping(true);
                            setUser((prev)=>{return {useremail:prev.useremail,password:newPassword}});
                        }}></Input>
                 </div>
                 <div className="login-modal__actions">
                  {!loginSuccessfull && <Button type='submit' >Login</Button>}
                 </div>
                 <div className="login-modal__actions">
                  <NavLink to='/login'><Button>Close</Button></NavLink>
                 </div>
                 {(accountNotFound && !loginSuccessfull && !isTyping )&& <p>Invalid.Account is not found!</p>}
                 
            </form>
            </div>
    </Card>
    )
})
export default Login;
