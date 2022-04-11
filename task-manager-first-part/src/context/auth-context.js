import React,{useState, useEffect} from "react";
export const AuthContext= React.createContext({
    isAuth: false,
    openSubs:false,
    userInformation:[],
    loginUserInfo:{},
    loginUserId:'',
    setUserIdtoContext:()=>{},
    createAccount:()=>{},
    login: ()=>{},
    logout:()=>{}
});
const AuthContextProvider= props =>{
    const [isAuthenticated, setIsAutheticated]=useState(false);
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
        <AuthContext.Provider value={{isAuth:isAuthenticated,openSubs:openSubs,userInformation:userInformation, loginUserInfo:loginUser,loginUserId:loginUserId,setUserIdtoContext:loginUserIdHandler ,login:loginHandler, logout:logoutHandler, createAccount:createAccountHandler}}>
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;