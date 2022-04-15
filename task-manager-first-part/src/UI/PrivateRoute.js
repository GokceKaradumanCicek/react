import React,{useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useAuth } from "../context/auth-context";
export default function PrivateRoute({component:Component, ...rest}){
    const{loginUser}=useAuth();
    return(
        <Route
         {...rest} render={props=>{ return loginUser ? <Component {...props}/>:<Redirect to="/login"/>}}
        >
        </Route>
    )

}