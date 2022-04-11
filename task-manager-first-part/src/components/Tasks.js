import React,{ useState , useCallback, useReducer, useContext} from "react";
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
        case 'DONE':{
            return action.doneTasks;
        }
        case 'OUTOFDATE':{
            return action.outOfDateTask;
        }
        case 'SHOWALL':{
            return action.allTasks;
        }
    }
}

const Tasks=()=>{
    const {loginUserInfo, userInformation,loginUserId, login}=useContext(AuthContext);
    const{isDone, isOutOfDate, doneTasksInContext}=useContext(DoneOutOfDateContext);
    const[currentUser, setCurrentUser]=useState({});
    const[error, setError]=useState(false);
    const[userTask, dispatchTask]=useReducer(userTaskReducer, []);

    // console.log("userTask", userTask);
    // console.log("LOGIN USER INFO FROM TASKS:", loginUserInfo);
    // console.log("LOG IN USER ID:", loginUserId);
    // console.log("ALL USERS IN TASK", userInformation);

//     const history=useHistory();
//     const location=useLocation();
//     const params={username:loginUserInfo.username, userId:loginUserId};
//     const serialize = obj => Object.keys(obj).map(key => `${key}=${encodeURIComponent(obj[key])}`).join('&');
//     history.push({
//         pathname: history.location.pathname,
//         search: serialize(params)
//     });
//    const queryParams=new URLSearchParams(location.search);
//    const queryUserName=queryParams.get('username');
//    console.log("user name", queryUserName);
//    const queryUserId=queryParams.get('userId');
//    console.log("user id", queryUserId);
    
    
    //const[tasks, setTask]=useState([]);
    // useEffect(()=>{
    //     fetch('https://task-manager-864b5-default-rtdb.firebaseio.com/tasks.json')
    //     .then( response => {return response.json()})
    //     .then( responseData => {
    //         console.log("GETTING DATA:", responseData);
    //         const loadedTasks=[];
    //         for(const key in responseData){
    //             loadedTasks.push({
    //                 id:key,
    //                 issue:responseData[key].issue,
    //                 project:responseData[key].project,
    //                 task:responseData[key].task
    //             });
    //         }
    //         console.log("LOADED TASK", loadedTasks);
    //         setTask(loadedTasks);
    // })
    // }, []);

    const onAddTaskHandler=async(newTask)=>{
        fetch('https://task-manager-864b5-default-rtdb.firebaseio.com/tasks.json',{
            method:'POST',
            body:JSON.stringify(newTask),
            headers:{ 'Content-Type' : 'application/json' }
        }).then(response =>{
            return response.json();
        }).then(responseData =>{
            dispatchTask({type:'ADD', newTaskAction:{id:responseData.name,...newTask}});
            // setTask((prevState) =>{
            //     return [...prevState, {id:responseData.name,...newTask}] });          
        }).catch(error=>{
            setError("Something went wrong");
        })
    }

     const removeItem=(taskId)=>{
      fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/tasks/${taskId}.json`,{
      method:'DELETE',
      })
      .then(response=>{
            dispatchTask({type:'DELETE', id:taskId});
            // setTask(prevState=>{
            //  return [...prevState.filter(task=> task.id !== taskId)];
            // });
       }).catch(error=>{
           setError("Something went wrong");
       })
     }

    const onSearchHandler=useCallback((filteredData)=>{
        //setTask(filteredData);
        console.log("filtered data", filteredData);
        dispatchTask({type:'FILTER', filteredData:filteredData});
    }, []);

    const showAllHandler=useCallback(()=>{
        console.log("SHOW ALL HANDLER İS CALLED");
        const showAll=[];
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/done.json`)
        .then(response =>{return response.json()})
        .then( responseData => {
            for(const key in responseData){
                showAll.push(responseData[key]);
            }
        });
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/outof.json`)
        .then(response=>{return response.json()})
        .then( responseData => {
            for(const key in responseData){
                showAll.push(responseData[key]);
            }
        });
        dispatchTask({type:'SHOWALL', allTasks:showAll});
    }, []);
    
    const onDoneHandler=useCallback(()=>{
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/done.json`)
        .then(response =>{return response.json()})
        .then( responseData => {
            console.log("DONE TASKS FROM TASKS", responseData);
            const loadedDone=[];
            for(const key in responseData){
                loadedDone.push(responseData[key]);
            }
            console.log("loaded done:", loadedDone);
            dispatchTask({type:'DONE', doneTasks:loadedDone});
        })
    }, []);
    
     const onOutOfDateHandler=useCallback(()=>{
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/outof.json`)
        .then(response=>{return response.json()})
        .then( responseData => {
            console.log("OUT TASKS FROM TASKS", responseData);
            const loadedOut=[];
            for(const key in responseData){
                loadedOut.push(responseData[key]);
            }
            console.log("loaded out:", loadedOut);
            dispatchTask({type:'OUTOFDATE', outOfDateTask:loadedOut})
        })
     }, []);

     console.log("!!!!!!!!!!!!!!!!!!!task", userTask);
    
    return(
     <div>
      {error && <ErrorModal onClose={()=>{setError(!error)}}>Something went wrong!</ErrorModal>}
       <TaskForm label="task"  addTask={onAddTaskHandler}/>
       <Filter filterHandler={onSearchHandler} tasks={userTask}/>
       <TaskList tasks={userTask} deleteTask={removeItem} makeItDone={onDoneHandler} makeItOutOf={onOutOfDateHandler} showAll={showAllHandler}/>
     </div>
    );
};
export default Tasks;