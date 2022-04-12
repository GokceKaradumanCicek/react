import { useState, useContext, useEffect } from "react";
import classes from "./TaskList.module.css";
import { AuthContext } from "../context/auth-context";
import { DoneOutOfDateContext } from "../context/doneOutOfDate-context";
const TaskList =(props)=>{
    const[doneTasks, setDoneTasks]=useState([]);
    const[outOfDateTasks, setOutOfTasks]=useState([]);
    const[unStatus,  setUnstatusTask]=useState([]);
    const[isButtonShown, setIsButtonShow]=useState(true);
    const{loginUserInfo,loginUserId}=useContext(AuthContext);
    const{isShowDone,isShowAll,isShowOutOfDate,setDoneToContext, setOutToContext, setUnstatusToContext}=useContext(DoneOutOfDateContext);
    const{tasks, makeItDone, makeItOutOf, makeItUnstatus, showDone, showAll, showOut}=props;

    console.log("DONE", doneTasks);
    console.log("OUT OF", outOfDateTasks);
    useEffect(()=>{
        if(isShowDone){
            showDone();
        }
        if(isShowAll){
            showAll();
        }
        if(isShowOutOfDate){
            showOut();
        }
    },[isShowDone, isShowAll, isShowOutOfDate]);
   
 return(
    <div>
        <ul>
            <table className={classes.table}>
                <thead>
                    <tr>
                    <th className={classes.th}>PROJECT</th>
                    <th className={classes.th}>ISSUE</th>
                    <th className={classes.th}>TASK</th>
                    <th className={classes.th}>ACTIONS</th>
                    </tr>
                   
                </thead>
                <tbody>
                {tasks.map( tsk =>(
                    <tr key={tsk.id}>
                     <td 
                      className={`${classes.td} 
                      ${(doneTasks.filter(d => d.id === tsk.id).length > 0 || tsk.done ===true ) && classes.done } 
                      ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.outofdatebutton }
                      ${(unStatus.filter(d => d.id === tsk.id).length > 0 && classes.td || (!tsk.done && !tsk.outOfDate))}`}>{tsk.project}</td>
                     <td 
                       className={`${classes.td} 
                       ${(doneTasks.filter(d => d.id === tsk.id).length > 0 || tsk.done ===true )&& classes.done }
                       ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.outofdatebutton }
                       ${unStatus.filter(d => d.id === tsk.id).length > 0 && classes.td || (!tsk.done && !tsk.outOfDate)}`}>{tsk.issue}</td>
                     <td 
                      className={`${classes.td}
                      ${(doneTasks.filter(d => d.id === tsk.id).length > 0 || tsk.done ===true ) && classes.done } 
                      ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.outofdatebutton }
                      ${unStatus.filter(d => d.id === tsk.id).length > 0 && classes.td}`}>{tsk.task}</td>

                     <td 
                     className={`${classes.td} 
                     ${(doneTasks.filter(d => d.id === tsk.id).length > 0|| tsk.done ===true ) && classes.done }
                     ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.undone }
                     ${unStatus.filter(d => d.id === tsk.id).length > 0 && classes.td}`}>
                         <button className={`${classes.button} ${(doneTasks.filter(d => d.id === tsk.id).length > 0 || tsk.done ===true)&& classes.donebutton } ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0 ||tsk.outOfDate===true)&& classes.outofdatebutton }`} onClick={props.deleteTask.bind(this, tsk.id)}>DELETE</button>
                         {(!tsk.done && !tsk.outOfDate)&&<button className={`${classes.button} ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.outofdatebutton } ${(doneTasks.filter(d => d.id === tsk.id).length > 0|| tsk.done ===true ) && classes.donebutton }
                          ${unStatus.filter(d => d.id === tsk.id).length > 0 && classes.button} `} onClick={()=>{
                             const index=tasks.findIndex(t=>t.id===tsk.id);
                             const newOutOfTasks={...tasks[index]};
                             makeItOutOf(newOutOfTasks);
                             setOutToContext(newOutOfTasks);
                             setOutOfTasks((prev)=>[...prev,{...newOutOfTasks}])
                         }}>OUT OF DATE</button>}
                         <button className={`${classes.button} ${(doneTasks.filter(d => d.id === tsk.id).length > 0 || tsk.done ===true )&& classes.donebutton} ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.outofdatebutton }`}>EDIT</button>
                         {(!tsk.done && !tsk.outOfDate) && <button className={`${classes.button} ${(doneTasks.filter(d => d.id === tsk.id).length > 0 ||tsk.done ===true) && classes.donebutton } ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.outofdatebutton }
                          ${unStatus.filter(d => d.id === tsk.id).length > 0 && classes.button}`} onClick={()=>{
                             const index=tasks.findIndex(t=>t.id===tsk.id);
                             const newDoneTasks={...tasks[index]};
                             makeItDone(newDoneTasks);
                             setDoneToContext(newDoneTasks);
                             setDoneTasks((prev)=>[...prev,{...newDoneTasks}]);
                         }}>DONE</button>}
                         {(tsk.done || tsk.outOfDate)&&<button className={`${classes.button} ${(doneTasks.filter(d => d.id === tsk.id).length > 0 ||tsk.done ===true) && classes.donebutton } ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.outofdatebutton } 
                          ${unStatus.filter(d => d.id === tsk.id).length > 0 && classes.button}
                         `} onClick={()=>{
                             const index=tasks.findIndex(t=>t.id===tsk.id);
                             const newUnstatusTasks={...tasks[index]};
                             makeItUnstatus(newUnstatusTasks);
                             setUnstatusToContext(newUnstatusTasks);
                             if(doneTasks.findIndex(d=>d.id === tsk.id)>-1){
                                const removeFromDone =doneTasks.filter(d =>d.id !==tsk.id );
                                setDoneTasks(removeFromDone);
                             }else{
                                 const removeFromOut=outOfDateTasks.filter(d =>d.id !==tsk.id);
                                 setOutOfTasks(removeFromOut);
                             }
                             setUnstatusTask((prev)=>[...prev,{...newUnstatusTasks}]);
                         }}>RETURN TO UNSTATUS</button>}
                     </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </ul>  
    </div>
);
}
export default TaskList;