import Card from "../UI/Card";
import classes from "./MainHeader.module.css";
import { useContext } from "react";
import { DoneOutOfDateContext } from "../context/doneOutOfDate-context";
import { AuthContext } from "../context/auth-context";
import Button from "../UI/Button";
import task from "../Image/task.jpg";
import { NavLink } from "react-router-dom";

const MainHeader=()=>{
    const{isShowDone,isOutOfDate,isShowAll,showDone, showOut, showAllTasks}=useContext(DoneOutOfDateContext);
    const{isLoginSuccessfull}=useContext(AuthContext);
    console.log("mainHeader isShowDone", isShowDone);
    console.log("mainHeader isOutOfDate", isOutOfDate);
    console.log("mainHeader isShowAll", isShowAll);
    return(    
    <nav>
         <Card> 
            
             <header>
             <img src={task}></img>
             </header>
             <div>
             <ul>
                 <div>
                  {(isLoginSuccessfull&&(isShowDone ||isOutOfDate)) && <button className={classes.navDone} onClick={()=>{showAllTasks()}}>Show All Tasks</button>}
                  {isLoginSuccessfull&&<button className={classes.navDone} onClick={()=>{showDone()}}>Done</button>}   
                  {isLoginSuccessfull&&<button className={classes.navOut} onClick={()=>{showOut()}}>Out of Date</button>}
                  {isLoginSuccessfull&&<NavLink to='/login'><button className={classes.signOut} onClick={()=>{showOut()}}>Sign out</button></NavLink>}
                </div>
              </ul>
              </div>
       </Card>
    </nav>
    )
}
export default MainHeader;