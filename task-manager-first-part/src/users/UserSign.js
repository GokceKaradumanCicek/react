import React, {useState,useContext, useEffect} from 'react';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Button from '../UI/Button';
import './UserSign.css';
import { AuthContext } from '../context/auth-context';
import { NavLink } from 'react-router-dom';
import Login from './Login';

const UserSign = React.memo(props => {
    const{createAccount, makeloginSuccessfull, login}=useContext(AuthContext);
    const [subsUserInfo, setSubsUserInfo]=useState({username:'', useremail:'', password:'', id:''});
    const [usersInfo, setUsersInfo]=useState([]);
    const[isSuccessful, setIsSuccessful]=useState(false);
    const[isAlreadyCreated, setIsAlreadyCreated]=useState(false);
    const[isValid, setIsValid]=useState(true);

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
            setUsersInfo(loadedUsers);
      })
    }, [subsUserInfo]);
  
    const submitHandler=(event)=>{
      event.preventDefault();
      const index=usersInfo.findIndex(u=>u.username===subsUserInfo.username && u.useremail===subsUserInfo.useremail);
      if(index===-1 && (subsUserInfo.username.trim().length !== 0 || subsUserInfo.useremail.trim().length !== 0 ||subsUserInfo.password.trim().length!==0)){
        fetch('https://task-manager-864b5-default-rtdb.firebaseio.com/userInfo.json',{
          method:'POST',
          body:JSON.stringify(subsUserInfo),
          headers:{
           "Content-Type":"application/json"
          }
         })
         .then(response=> response.json())
         .then(responseData=>{
          return setUsersInfo((prevUser)=>{ return [...prevUser,{id:responseData.name, ...subsUserInfo}]});
         });
         createAccount();
         setIsSuccessful(true);
      }
      if(index!==-1){
        setIsAlreadyCreated(true);
      }
      if(subsUserInfo.username.trim().length === 0 || subsUserInfo.useremail.trim().length === 0 ||subsUserInfo.password.trim().length===0){
        setIsValid(false);
      }
    }

     console.log("USERS:", usersInfo);
return (
<Card>
        <div className="backdrop" onClick={props.onClose} />
        <div className="login-modal">
        <h2>Create an Account</h2>
        <form onSubmit={submitHandler}>
             <div>
                 <Input id="username" label="User Name:" value={subsUserInfo.username} onChange={(event)=>{const newName=event.target.value;
      setSubsUserInfo((prev)=>{return {username:newName,useremail:prev.useremail,password:prev.password,id:Math.random().toString()}});
     }}></Input>
             </div>
             <div>
                 <Input id="email" label="Email:" value={subsUserInfo.useremail} onChange={(event)=>{const newEmail=event.target.value;
      setSubsUserInfo((prev)=>{return {username:prev.username,useremail:newEmail,password:prev.password,id:Math.random().toString()}});
     }}></Input>
             </div>
             <div>
                 <Input type="password" id="password" label="Create Password:" value={subsUserInfo.password} onChange={(event)=>{const newPassword=event.target.value; 
                        setSubsUserInfo((prev)=>{return {username:prev.username,useremail:prev.useremail,password:newPassword,id:Math.random().toString()}});
     }}></Input>
             </div>
             <div className="login-modal__actions">
                 {!isSuccessful&&<Button type="submit">Create Account</Button>}
             </div>
             <div className="login-modal__actions">
                 {isSuccessful && <NavLink to='/tasks'><Button onClick={()=>{makeloginSuccessfull(); login(subsUserInfo)}}>Login</Button></NavLink>}
             </div>
             <div className="login-modal__actions">
                 <NavLink to='/login'><Button >Close</Button></NavLink>
             </div>
        </form>
        {isAlreadyCreated&&<p>This account is already created!</p>}
        {!isValid&&<p>Invalid information.Please check your entries!</p>}
        </div>
</Card>
  );
});
export default UserSign;