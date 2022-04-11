import React,{useState, useContext} from "react";
import { AuthContext } from "./auth-context";
export const DoneOutOfDateContext= React.createContext({
  isDone:false,
  isOutOfDate:false,
  isShowAll:false,
  doneTasksInContext:[],
  outOfDateTasksFromContext:[],
  allTasks:[],
  setAll:()=>{},
  setDone:()=>{},
  setOut:()=>{},
  setDoneToContext:()=>{},
  setOutOfDateToContext:()=>{},
  showAllTasks:()=>{},
  setAllTasks:()=>{}
});
const DoneOutOfDateProvider= props =>{
    const[isDone, setIsDone]=useState(false);
    const[isOutOfDate, setIsOut]=useState(false);
    const[isShowAll, setIsShowAll]=useState(false);
    const[doneTasks, setDoneTasks]=useState([]);
    const[outOfDateTasks, setOutOfDateTasks]=useState([]);
    const[allTasks, setAllTasks]=useState([]);
    const{loginUserInfo,loginUserId}=useContext(AuthContext);

    const setDoneHandler=()=>{
        setIsDone(true);
        setIsOut(false);
        setIsShowAll(false);
    }
    const setOutOfDateHandler=()=>{
        setIsOut(true);
        setIsDone(false);
        setIsShowAll(false);
    }

   const doneHandler=(newTask)=>{
       console.log("CONTEXT DONE", newTask);
       if(newTask.done===false){
        const newDone={...newTask, done:true};
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/done.json`,{
            method:'POST',
            body:JSON.stringify(newDone),
            headers:{ 'Content-Type' : 'application/json' }
        }).then(response =>{return response.json()})
          .then( responseData => {
            setDoneTasks((prev)=>{return [...prev, {...newDone}]});
        })
      }   
   }
   const outOfDateHandler=(newTask)=>{
    if(newTask.outOfDate ===false){
        console.log("İSOUTOF PROP İS FALSE");
        const newOut={...newTask, outOfDate:true};
        console.log("NEW OUT", newOut);
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/outof.json`,{
            method:'POST',
            body:JSON.stringify(newOut),
            headers:{ 'Content-Type' : 'application/json' }
        }).then(response =>{return response.json()})
          .then( responseData => {
            setOutOfDateTasks((prev)=>{return [...prev, {...newOut}]});
        });
    }    
   }
   const showAllTasks=()=>{
     setIsDone(false);
     setIsOut(false);
     setIsShowAll(true);
   }

    return(
        <DoneOutOfDateContext.Provider value={{isDone:isDone,isOutOfDate:isOutOfDate ,isShowAll:isShowAll, doneTasksInContext:doneTasks,outOfDateTasksFromContext:outOfDateTasks,allTasks:allTasks,setDoneToContext:doneHandler, setOutOfDateToContext:outOfDateHandler, setDone:setDoneHandler, setOut:setOutOfDateHandler, showAllTasks}}>
            {props.children}
        </DoneOutOfDateContext.Provider>
    );
}
export default DoneOutOfDateProvider;