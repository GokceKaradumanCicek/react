import { useState, useContext, useEffect } from "react";
import { useDispatch} from "react-redux";
import {doneOutNumberActions} from "../store/index";
import classes from "./TaskList.module.css";
import { AuthContext } from "../context/auth-context";
import { DoneOutOfDateContext } from "../context/doneOutOfDate-context";
const TaskList =(props)=>{
    const[doneTasks, setDoneTasks]=useState([]);
    const[outOfDateTasks, setOutOfTasks]=useState([]);
    const[unStatus,  setUnstatusTask]=useState([]);
    const[isButtonShown, setIsButtonShow]=useState(true);
    const[doneClick, setDoneClick]=useState(false);
    const[outClick, setOutClick]=useState(false);
    const[unstatClick, setUnstatClick]=useState(false);
    const{isShowDone,isShowAll,isShowOutOfDate,setNumberOfOut,setNumberOfDone,setDoneToContext, setOutToContext, setUnstatusToContext}=useContext(DoneOutOfDateContext);
    const{tasks, makeItDone, makeItOutOf, makeItUnstatus, showDone, showAll, showOut, currentUser}=props;

    console.log("DONE", doneTasks);
    console.log("OUT OF", outOfDateTasks);
    console.log("TASK FILTER LOGİNUSER:", currentUser);

    const dispatch=useDispatch();
    useEffect(()=>{
        setDoneClick(false);
        setOutClick(false);
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/tasks/${currentUser.username}.json`)
        .then(response=> response.json())
        .then(responseData=>{
            const loadedData=[];
            for(const key in responseData){
                loadedData.push({
                    id:key,
                    issue:responseData[key].issue,
                    project:responseData[key].project,
                    task:responseData[key].task,
                    username:responseData[key].username,
                    userId:responseData[key].userId,
                    done:responseData[key].done,
                    outOfDate:responseData[key].outOfDate
                })
            }
            console.log("LOADED DATA", loadedData);
            const doneNumber= loadedData.filter(t=>t.done===true);
            console.log("DONE NUMBER(TASKS):", doneNumber);
            console.log("DONE NUMBER:", doneNumber.length);
            dispatch(doneOutNumberActions.done(doneNumber.length))
            
            const outNumber= loadedData.filter(t=>t.outOfDate===true);
            console.log("OUT NUMBER(TASK)", outNumber);
            console.log("OUT NUMBER:", outNumber.length);

            dispatch(doneOutNumberActions.out(outNumber.length));
            const unstatusNumber= loadedData.filter(t=>(t.done==false&&t.outOfDate===false));
            console.log("UNSTAT NUMBER:", unstatusNumber.length);
        })
    }, [doneClick, outClick, unstatClick, currentUser]);
    
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
                             const filteredTask=tasks.filter(t=>t.username===currentUser.username && t.userId===currentUser.userId);
                             const index=filteredTask.findIndex(t=>t.id===tsk.id);
                             const newOutOfTasks={...filteredTask[index]};
                             console.log("NEW OUT OF TASKS:", newOutOfTasks);
                             makeItOutOf(newOutOfTasks);
                             //let newOutOfTasksForUser=newOutOfTasks.filter(t=>t.username===currentUser.username && t.userId===currentUser.userId);
                             setOutToContext(newOutOfTasks);
                             //setOutToContext(newOutOfTasksForUser);
                             //setOutOfTasks((prev)=>[...prev,{...newOutOfTasksForUser}])
                             setOutOfTasks((prev)=>[...prev,{...newOutOfTasks}])
                             setOutClick(true);
                         }}>OUT OF DATE</button>}
                         <button className={`${classes.button} ${(doneTasks.filter(d => d.id === tsk.id).length > 0 || tsk.done ===true )&& classes.donebutton} ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.outofdatebutton }`}>EDIT</button>
                         {(!tsk.done && !tsk.outOfDate) && <button className={`${classes.button} ${(doneTasks.filter(d => d.id === tsk.id).length > 0 ||tsk.done ===true) && classes.donebutton } ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.outofdatebutton }
                          ${unStatus.filter(d => d.id === tsk.id).length > 0 && classes.button}`} onClick={()=>{
                            const filteredTask=tasks.filter(t=>t.username===currentUser.username && t.userId===currentUser.userId);
                             const index=filteredTask.findIndex(t=>t.id===tsk.id);
                             const newDoneTasks={...filteredTask[index]};
                             makeItDone(newDoneTasks);
                             //let newDoneTasksForUser=newDoneTasks.filter(t=>t.username===currentUser.username && t.userId===loginUserId);
                             setDoneToContext(newDoneTasks);
                             setDoneTasks((prev)=>[...prev,{...newDoneTasks}]);
                             //setDoneToContext(newDoneTasksForUser);
                             //setDoneTasks((prev)=>[...prev,{...newDoneTasksForUser}]);
                             setDoneClick(true);
                         }}>DONE</button>}
                         {(tsk.done || tsk.outOfDate)&&<button className={`${classes.button} ${(doneTasks.filter(d => d.id === tsk.id).length > 0 ||tsk.done ===true) && classes.donebutton } ${(outOfDateTasks.filter(d => d.id === tsk.id).length > 0||tsk.outOfDate===true) && classes.outofdatebutton } 
                          ${unStatus.filter(d => d.id === tsk.id).length > 0 && classes.button}
                         `} onClick={()=>{
                            const filteredTask=tasks.filter(t=>t.username===currentUser.username && t.userId===currentUser.userId);
                            const index=filteredTask.findIndex(t=>t.id===tsk.id);
                             const newUnstatusTasks={...filteredTask[index]};
                             makeItUnstatus(newUnstatusTasks);
                             //let newUnstatTasksForUser=newUnstatusTasks.filter(t=>t.username===currentUser.username && t.userId===loginUserId);
                             //setUnstatusToContext(newUnstatTasksForUser);
                             setUnstatusToContext(newUnstatusTasks);
                             if(doneTasks.findIndex(d=>d.id === tsk.id)>-1){
                                const removeFromDone =doneTasks.filter(d =>d.id !==tsk.id );
                                setDoneTasks(removeFromDone);
                                setDoneClick(true);
                             }else{
                                 const removeFromOut=outOfDateTasks.filter(d =>d.id !==tsk.id);
                                 setOutOfTasks(removeFromOut);
                                 setOutClick(true);
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