import React,{useState, useEffect} from "react";
export const AuthContext= React.createContext({
    isAuth: false,
    isLoginSuccessfull:false,
    openSubs:false,
    userInformation:[],
    loginUserInfo:{},
    loginUserId:'',
    setUserIdtoContext:()=>{},
    createAccount:()=>{},
    login: ()=>{},
    logout:()=>{},
    makeloginSuccessfull:()=>{}
});
const AuthContextProvider= props =>{
    const [isAuthenticated, setIsAutheticated]=useState(false);
    const [isLoginSuccessfull, setIsLoginSuccessfull]=useState(false);
    const[userInformation, setUserInformation]=useState([]);
    const[loginUser, setLoginUser]=useState({});
    const[loginUserId, setLoginUserId]=useState('');
    const[openSubs, setOpenSubs]=useState(false);
    
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
      }, []);

    const loginUserIdHandler=(userId)=>{
        setLoginUserId(userId);
    }
    
    const loginSuccessfullHandler=()=>{
        setIsLoginSuccessfull(true);
    }

    const loginHandler =(user)=>{
        setLoginUser(user);
        setIsAutheticated(true);
    }
    const logoutHandler=()=>{
        setIsAutheticated(false);
    }
    const createAccountHandler =()=>{
        setOpenSubs(true);
    }
    return(
        <AuthContext.Provider value={{isLoginSuccessfull:isLoginSuccessfull,isAuth:isAuthenticated,openSubs:openSubs,userInformation:userInformation, loginUserInfo:loginUser,loginUserId:loginUserId,setUserIdtoContext:loginUserIdHandler ,login:loginHandler, logout:logoutHandler, createAccount:createAccountHandler, makeloginSuccessfull:loginSuccessfullHandler}}>
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;