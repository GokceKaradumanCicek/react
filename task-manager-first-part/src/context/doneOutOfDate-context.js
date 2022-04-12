import React,{useState, useContext, useEffect} from "react";
import { AuthContext } from "./auth-context";
export const DoneOutOfDateContext= React.createContext({
  isShowDone:false,
  isShowAll:false,
  isShowOutOfDate:false,
  doneTasksInContext:[],
  outOfDateTasksFromContext:[],
  unStatusTaskFromContext:[],
  setOutToContext:()=>{},
  setDoneToContext:()=>{},
  setUnstatusToContext:()=>{},
  showDone:()=>{},
  showAllTasks:()=>{},
  showOut:()=>{}
});
const DoneOutOfDateProvider= props =>{
    const[isShowDone, setIsShowDone]=useState(false);
    const[isShowAll, setIsSowAll]=useState(false);
    const[isShowOutOfDate, setIsShowOut]=useState(false);
    const[doneTasks, setDoneTasks]=useState([]);
    const[outOfDateTasks, setOutOfDateTasks]=useState([]);
    const[unStatusTasks, setUnStatusTasks]=useState([]);
    const{loginUserInfo,loginUserId}=useContext(AuthContext);

    const setDoneHandler=(newDone)=>{
        setDoneTasks((prev)=>[...prev,{...newDone}]);
    }

    const setOutHandler=(newOut)=>{
        setOutOfDateTasks((prev)=>[...prev,{...newOut}]);
    }

    const setUnstatusHandler=(newUnStatus)=>{
        setUnStatusTasks((prev)=>[...prev,{...newUnStatus}]);
    }

    const showDoneHandler=()=>{
        setIsSowAll(false);
        setIsShowOut(false);
        setIsShowDone(true);
    }
    const showAllHandler=()=>{
        setIsShowDone(false);
        setIsShowOut(false);
        setIsSowAll(true);
    }
    const showOutHandler=()=>{
        setIsShowDone(false);
        setIsSowAll(false);
        setIsShowOut(true);
    }
//    const doneHandler=(newTask)=>{
//        console.log("CONTEXT DONE", newTask);
//        if(newTask.done===false){
//         const newDone={...newTask, done:true};
//         fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/done.json`,{
//             method:'POST',
//             body:JSON.stringify(newDone),
//             headers:{ 'Content-Type' : 'application/json' }
//         }).then(response =>{return response.json()})
//           .then( responseData => {
//             setDoneTasks((prev)=>{return [...prev, {...newDone}]});
//         })
//       }   
//    }
//    const outOfDateHandler=(newTask)=>{
//     if(newTask.outOfDate ===false){
//         console.log("İSOUTOF PROP İS FALSE");
//         const newOut={...newTask, outOfDate:true};
//         console.log("NEW OUT", newOut);
//         fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/outof.json`,{
//             method:'POST',
//             body:JSON.stringify(newOut),
//             headers:{ 'Content-Type' : 'application/json' }
//         }).then(response =>{return response.json()})
//           .then( responseData => {
//             setOutOfDateTasks((prev)=>{return [...prev, {...newOut}]});
//         });
//     }    
//    }

    return(
        <DoneOutOfDateContext.Provider value={{isShowOutOfDate:isShowOutOfDate,isShowAll:isShowAll,isShowDone:isShowDone, doneTasksInContext:doneTasks,outOfDateTasksFromContext:outOfDateTasks,unStatusTaskFromContext:unStatusTasks,setDoneToContext:setDoneHandler, setOutToContext:setOutHandler, setUnstatusToContext:setUnstatusHandler, showDone:showDoneHandler, showAllTasks:showAllHandler, showOut:showOutHandler}}>
            {props.children}
        </DoneOutOfDateContext.Provider>
    );
}
export default DoneOutOfDateProvider;