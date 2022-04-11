import Card from "../UI/Card";
import classes from "./MainHeader.module.css";
import { useContext } from "react";
import { DoneOutOfDateContext } from "../context/doneOutOfDate-context";
import Button from "../UI/Button";
const MainHeader=()=>{
    const{isDone,isOutOfDate,isShowAll,setDone, setOut, showAllTasks}=useContext(DoneOutOfDateContext);
    console.log("mainHeader isDone", isDone);
    console.log("mainHeader isOutOfDate", isOutOfDate);
    console.log("mainHeader isShowAll", isShowAll);
    return(    
    <nav>
         <Card>
             <header>
             <h2>TASK MANAGER</h2>
             <ul>
                {(isDone ||isOutOfDate) && <Button onClick={()=>{showAllTasks()}}>Show All Tasks</Button>}
                <Button className={classes.navDone} onClick={()=>{setDone()}}>Done</Button>
                <Button className={classes.navOut} onClick={()=>{setOut()}}>Out of Date</Button>
              </ul>
             </header>
       </Card>
    </nav>
    )
}
export default MainHeader;