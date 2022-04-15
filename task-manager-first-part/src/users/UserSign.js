import React, {useState,useContext, useEffect} from 'react';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Button from '../UI/Button';
import './UserSign.css';
import { AuthContext } from '../context/auth-context';
import { NavLink } from 'react-router-dom';

const UserSign = React.memo(props => {
    const{makeloginSuccessfull, login, signup}=useContext(AuthContext);
    const [subsUserInfo, setSubsUserInfo]=useState({username:'', useremail:'', password:'', id:''});//Newly created account user
    const [usersInfo, setUsersInfo]=useState([]);//usersInfo contains all users
    const [error, setError]=useState();
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
  
    async function submitHandler(event){
      event.preventDefault();
      setIsAlreadyCreated(false);
      setIsValid(false);
      setIsSuccessful(false);
      setError(null);
      const index=usersInfo.findIndex(u=>u.username===subsUserInfo.username && u.useremail===subsUserInfo.useremail);
      if(index===-1 && (subsUserInfo.username.trim().length !== 0 || subsUserInfo.useremail.trim().length !== 0 ||subsUserInfo.password.trim().length!==0)){
        setIsValid(true);
        try{
          let response=await signup(subsUserInfo.useremail, subsUserInfo.password);
          if(response.additionalUserInfo.isNewUser && !error){
            setError(null);
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
            setIsSuccessful(true);
          }
        }catch(err){
          setError(err);
        }
      }else{
        setIsValid(false);
      }
      if(index!==-1){
        setIsAlreadyCreated(true);
      }
    }
    console.log("++++++++++SUBSUSERINFO", subsUserInfo);

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
                 {error &&<Button onClick={() => window.location.reload()}>Try Again</Button>}
             </div>
             <div className="login-modal__actions">
                 {(!isSuccessful&&!error) &&<Button type="submit" disabled={error}>Create Account</Button>}
             </div>
             <div className="login-modal__actions">
                 {(isSuccessful&& !error) && <NavLink to='/tasks'><Button onClick={()=>{makeloginSuccessfull(); login(subsUserInfo.useremail, subsUserInfo.password, subsUserInfo.username, subsUserInfo.id)}}>Login</Button></NavLink>}
             </div>
             <div className="login-modal__actions">
                 <NavLink to='/login'><Button >Close</Button></NavLink>
             </div>
        </form>
        {isAlreadyCreated&&<p>This account is already created!</p>}
        {!isValid&&<p>Invalid information.Please check your entries!</p>}
        {error && `Error:${error}`}
        </div>
</Card>
  );
});
export default UserSign;