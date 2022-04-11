import { useState, useContext, useEffect } from "react";
import classes from "./TaskList.module.css";
import { AuthContext } from "../context/auth-context";
import { DoneOutOfDateContext } from "../context/doneOutOfDate-context";
const TaskList =(props)=>{
    const[doneTasks, setDoneTasks]=useState([]);
    const[outOfDateTasks, setOutOfTasks]=useState([]);
    const{loginUserInfo,loginUserId}=useContext(AuthContext);
    const{isDone,isShowAll,doneTasksInContext,isOutOfDate,allTasks,setDoneToContext, setOutOfDateToContext}=useContext(DoneOutOfDateContext);
    const{tasks, makeItDone, makeItOutOf, showAll}=props;


    console.log("ALL TASK FROM list", allTasks);
    useEffect(()=>{
        if(isDone && !isOutOfDate){
            makeItDone(doneTasks);
        }else if(isOutOfDate && !isDone){
            makeItOutOf(outOfDateTasks);
        }else if(isShowAll){
            console.log("SHOW ALL DÖNGÜSÜNE GİRDİ")
            showAll();
        }
    },[isDone, doneTasks,isOutOfDate,outOfDateTasks, isShowAll])
    
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
                      ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.outofdatebutton }`}>{tsk.project}</td>
                     <td 
                       className={`${classes.td} 
                       ${(doneTasks.filter(d => d.id === tsk.id).length > 0 || tsk.done ===true )&& classes.done }
                       ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.outofdatebutton }`}>{tsk.issue}</td>
                     <td 
                      className={`${classes.td}
                      ${(doneTasks.filter(d => d.id === tsk.id).length > 0 || tsk.done ===true ) && classes.done } 
                      ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.outofdatebutton }`}>{tsk.task}</td>

                     <td 
                     className={`${classes.td} 
                     ${(doneTasks.filter(d => d.id === tsk.id).length > 0|| tsk.done ===true ) && classes.done }
                     ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.undone }`}>
                         <button className={`${classes.button} ${(doneTasks.filter(d => d.id === tsk.id).length > 0 || tsk.done ===true)&& classes.donebutton } ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0 ||tsk.outOfDate===true)&& classes.outofdatebutton }`} onClick={props.deleteTask.bind(this, tsk.id)}>DELETE</button>
                         <button className={`${classes.button} ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.outofdatebutton } ${(doneTasks.filter(d => d.id === tsk.id).length > 0|| tsk.done ===true ) && classes.donebutton } `} onClick={()=>{
                             const index=tasks.findIndex(t=>t.id===tsk.id);
                             const newOutOfTasks={...tasks[index]};
                             const isThisIncluded= outOfDateTasks.findIndex(d=>d.id === newOutOfTasks.id);
                             if(isThisIncluded === -1){
                                setOutOfDateToContext(newOutOfTasks);
                             }
                             
                         }}>OUT OF DATE</button>
                         <button className={`${classes.button} ${(doneTasks.filter(d => d.id === tsk.id).length > 0 || tsk.done ===true )&& classes.donebutton} ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.outofdatebutton }`}>EDIT</button>
                         <button className={`${classes.button} ${(doneTasks.filter(d => d.id === tsk.id).length > 0 || tsk.done ===true) && classes.donebutton } ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.outofdatebutton }`} onClick={()=>{
                             const index=tasks.findIndex(t=>t.id===tsk.id);
                             const newDoneTasks={...tasks[index]};
                             const isItIncluded= doneTasks.findIndex(d=>d.id === newDoneTasks.id)
                             if(isItIncluded === -1){
                                setDoneToContext(newDoneTasks)
                             }
                         }}>DONE</button>
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