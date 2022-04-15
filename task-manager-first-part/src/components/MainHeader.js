import Card from "../UI/Card";
import classes from "./MainHeader.module.css";
import { useContext} from "react";
import { useSelector} from "react-redux";
import { DoneOutOfDateContext } from "../context/doneOutOfDate-context";
import { AuthContext } from "../context/auth-context";
import tsk from "../Image/tsk.jpg";
import { NavLink } from "react-router-dom";

const MainHeader=()=>{
    //const numberOfDone=useSelector(state=>state.numberDone);
    //const numberOfOut=useSelector(state=>state.numberOut);
    const numberOfDone=useSelector(state=>state.doneNumber);
    const numberOfOut=useSelector(state=>state.outNumber);


    const{isShowDone,isOutOfDate,isShowAll,showDone, showOut, showAllTasks}=useContext(DoneOutOfDateContext);
    const{logout}=useContext(AuthContext);
    const{isLoginSuccessfull}=useContext(AuthContext);
    console.log("mainHeader isShowDone", isShowDone);
    console.log("mainHeader isOutOfDate", isOutOfDate);
    console.log("mainHeader isShowAll", isShowAll);
    console.log("mainHeader isloginSuccsessfull", isLoginSuccessfull);
    console.log("NUMBER DONE:", numberOfDone);
    console.log("NUMBER OUT:", numberOfOut);
    const username=localStorage.getItem("username");
    return(    
    <nav>
         <Card> 
            
             <header>
             <img src={tsk} className={classes.img}></img>
             </header>
             <div>
             <ul>
                <div>
                {isLoginSuccessfull&&<p className={classes.welcome}> Welcome {`${username}`}!</p>}
                </div>
                 <div>
                  {(username &&(isLoginSuccessfull&&(isShowDone ||isOutOfDate))) && <button className={classes.navDone} onClick={()=>{showAllTasks()}}>Show All Tasks</button>}
                  { (username && isLoginSuccessfull)&& <button className={classes.navDone} onClick={()=>{showDone()}}>Done ({`${numberOfDone}`})</button>}   
                  {(username && isLoginSuccessfull)&& <button className={classes.navOut} onClick={()=>{showOut()}}>Out of Date ({`${numberOfOut}`})</button>}
                  {(username && isLoginSuccessfull)&& <NavLink to='/login'><button className={classes.signOut} onClick={()=>{logout()}}>Sign out</button></NavLink>} 
                </div>
              </ul>
              </div>
       </Card>
    </nav>
    )
}
export default MainHeader;