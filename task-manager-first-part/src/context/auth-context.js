import React,{useState, useEffect, useContext} from "react";
import { auth } from "../firebase";
export const AuthContext= React.createContext({
    isAuth: false,
    isLoginSuccessfull:false,
    openSubs:false,
    userInformation:[],
    loginUserInfo:{},
    loginUserId:'',
    setUserIdtoContext:()=>{},
    login: ()=>{},
    logout:()=>{},
    makeloginSuccessfull:()=>{},
    signup:()=>{},
    setUserInformation:()=>{}
});
const AuthContextProvider= props =>{
    const [isAuthenticated, setIsAutheticated]=useState(false);
    const [isLoginSuccessfull, setIsLoginSuccessfull]=useState(false);//makeloginSuccessfull function makes isLoginSuccessfull true.
    const [isLoading, setLoading]=useState(true);
    const[userInformation, setUserInformation]=useState([]);
    const[loginUser, setLoginUser]=useState();
    const[loginUserId, setLoginUserId]=useState('');
    const[openSubs, setOpenSubs]=useState(false);
    

    const loginUserIdHandler=(userId)=>{
        setLoginUserId(userId);
    }
    
    const loginSuccessfullHandler=()=>{
        setIsLoginSuccessfull(true);
    }

    const logoutHandler=()=>{
        setIsAutheticated(false);
        setIsLoginSuccessfull(false);
        localStorage.clear();
        return auth.signOut();
    }
    
    const loginHandler =async(email, password, username, id)=>{
        const user={useremail:email, password:password, username:username, userId:id};
        localStorage.setItem('username', username);
        localStorage.setItem('userId', id);
        localStorage.setItem('password', password);
        localStorage.setItem('useremail', email);
        setLoginUser(user);
        setIsAutheticated(true);
        setIsLoginSuccessfull(true);
        return auth.signInWithEmailAndPassword(email,password);
    }

    function signup(email, password){
        console.log("SIGN IN WORKS");
        return auth.createUserWithEmailAndPassword(email, password);
    }
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            console.log("UNSUBSCRIBE WORK");
            console.log("UNSUBSCRIBE WORK USER", user);
            setLoginUser(user);
            setLoading(false);
        })
        return unsubscribe
    }, [])

    return(
        <AuthContext.Provider value={{signup,loginUser,userInformation, setUserInformation,isLoginSuccessfull:isLoginSuccessfull,isAuth:isAuthenticated,openSubs:openSubs,loginUserId:loginUserId,setUserIdtoContext:loginUserIdHandler ,login:loginHandler, logout:logoutHandler, makeloginSuccessfull:loginSuccessfullHandler}}>
            {!isLoading && props.children}
        </AuthContext.Provider>
    );
}
export function useAuth(){
    return useContext(AuthContext);
}
export default AuthContextProvider;