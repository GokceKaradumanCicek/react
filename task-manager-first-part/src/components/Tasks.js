import React,{ useState , useCallback, useReducer, useContext, useEffect} from "react";
import TaskForm from "./TaskForm";
import Filter from "./Filter";
import TaskList from "./TaskList";
import ErrorModal from "../UI/ErrorModal";
import { AuthContext } from "../context/auth-context";
import {DoneOutOfDateContext} from "../context/doneOutOfDate-context";

const userTaskReducer=(currentState, action)=>{
    switch(action.type){
        case 'ADD':{
            return [...currentState, action.newTaskAction]; 
        }
        case 'FILTER':{
            return action.filteredData; 
        }
        case 'DELETE':{
            return currentState.filter(ing=> ing.id !== action.id);
        }
    }
}

const Tasks=()=>{
    const {loginUserInfo, userInformation,loginUserId, login}=useContext(AuthContext);
    const{isDone, isOutOfDate, doneTasksInContext,setDoneTasks,setOutOfDateTasks}=useContext(DoneOutOfDateContext);
    const[currentUser, setCurrentUser]=useState({});
    const[done, setDone]=useState([]);
    const[outOf, setOutOf]=useState([]);
    const[error, setError]=useState(false);
    const[userTask, dispatchTask]=useReducer(userTaskReducer, []);

    const onAddTaskHandler=async(newTask)=>{
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/tasks.json`,{
            method:'POST',
            body:JSON.stringify(newTask),
            headers:{ 'Content-Type' : 'application/json' }
        }).then(response =>{
            return response.json();
        }).then(responseData =>{
            dispatchTask({type:'ADD', newTaskAction:{id:responseData.name,...newTask}});
        }).catch(error=>{
            setError("Something went wrong");
        })
    }

     const removeItem=(taskId)=>{
      fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/tasks/${taskId}.json`,{
      method:'DELETE',
      })
      .then(response=>{
            dispatchTask({type:'DELETE', id:taskId});
       }).catch(error=>{
           setError("Something went wrong");
       })
     }

    const onSearchHandler=useCallback((filteredData)=>{
        //setTask(filteredData);
        console.log("filtered data", filteredData);
        dispatchTask({type:'FILTER', filteredData:filteredData});
    }, []);
    
    const onDoneHandler=useCallback((newDoneTasks)=>{
        const taskId=newDoneTasks.id;
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/tasks/${taskId}.json`,{
            method: "PATCH",
            body:JSON.stringify({done:true, outOfDate:false}),
            headers:{ 'Content-Type' : 'application/json' }
        })
        .then(response =>{return response.json()})
        .then(responseData=>{console.log("onDoneHandler is successful.")})
        .catch(error=>{
            console.log("ERROR iN onDoneHandler", error);
        })
    }, []);
    
     const onOutOfDateHandler=useCallback((newOutTask)=>{
        const taskId=newOutTask.id;
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/tasks/${taskId}.json`,{
            method: "PATCH",
            body:JSON.stringify({outOfDate:true, done:false}),
            headers:{ 'Content-Type' : 'application/json' }
        })
        .then(response=>{return response.json()})
        .then( responseData => {console.log("onOutOfDate is successful.")})
        .catch(error=>{
            console.log("ERROR in onOutOfDateHandler", error);
        })
     }, []);

     const onMakeItUnStatusHandler=useCallback((task)=>{
        const taskId=task.id;
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/tasks/${taskId}.json`,{
            method: "PATCH",
            body:JSON.stringify({outOfDate:false, done:false}),
            headers:{ 'Content-Type' : 'application/json' }
        })
        .then(response=>{return response.json()})
        .then( responseData => {console.log("onMakeItUnStatusHandler is successful.")})
        .catch(error=>{
            console.log("ERROR in onMakeItUnStatusHandler", error);
        })
     }, []);

     const showDoneTasks=useCallback(()=>{
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/tasks.json`)
        .then(response=>{return response.json()})
        .then( responseData => {
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
            const filteredData=loadedData.filter(t=>t.done===true);
            console.log("FILTERED DONE TASKS:", filteredData);
            dispatchTask({type:'FILTER', filteredData:filteredData});  
        })
        .catch(error=>{
            console.log("ERROR in showDoneTasks", error);
        })

     }, []);

     const onShowOutTasks=useCallback(()=>{
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/tasks.json`)
        .then(response=>{return response.json()})
        .then( responseData => {
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
            const filteredData=loadedData.filter(t=>t.outOfDate===true);
            console.log("FILTERED DONE TASKS:", filteredData);
            dispatchTask({type:'FILTER', filteredData:filteredData});  
        })
        .catch(error=>{
            console.log("ERROR in showDoneTasks", error);
        })

     }, []);


     const onShowAllHandler=useCallback(()=>{
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/tasks.json`)
        .then(response=>{return response.json()})
        .then( responseData => {
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
            dispatchTask({type:'FILTER', filteredData:loadedData});  
        })
        .catch(error=>{
            console.log("ERROR in onShowAllHandler", error);
        })

     }, []);

    
    return(
     <div>
      {error && <ErrorModal onClose={()=>{setError(!error)}}>Something went wrong!</ErrorModal>}
       <TaskForm label="task"  addTask={onAddTaskHandler}/>
       <Filter filterHandler={onSearchHandler} tasks={userTask}/>
       <TaskList tasks={userTask} deleteTask={removeItem} makeItDone={onDoneHandler} makeItOutOf={onOutOfDateHandler} makeItUnstatus={onMakeItUnStatusHandler} showDone={showDoneTasks} showAll={onShowAllHandler} showOut={onShowOutTasks} />
     </div>
    );
};
export default Tasks;