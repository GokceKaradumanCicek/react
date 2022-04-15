import React,{ useState , useCallback, useReducer, useContext, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import {doneOutNumberActions} from "../store/index";
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
    const {loginUser, userInformation,loginUserId, login}=useContext(AuthContext);
    const{isDone, isOutOfDate, doneTasksInContext,setDoneTasks,setOutOfDateTasks}=useContext(DoneOutOfDateContext);
     const[user, setUser]=useState({});
    const[done, setDone]=useState([]);
    const[outOf, setOutOf]=useState([]);
    const[error, setError]=useState(false);
    const[userTask, dispatchTask]=useReducer(userTaskReducer, []);
    const dispatch=useDispatch();
    const numberOfDone=useSelector(state=>state.doneNumber);
    const numberOfOut=useSelector(state=>state.outNumber);
    console.log("loginUser", loginUser);


    useEffect(() => {
        const user={
            username:localStorage.getItem('username'),
            useremail:localStorage.getItem('useremail'),
            userId:localStorage.getItem('userId'),
            password:localStorage.getItem('password')
        }
        console.log("&&&&&&&&&user", user);
        setUser(user);
      }, []);


    //const foundUser = JSON.parse(localStorage.getItem("user"));
    //console.log("foundUser", foundUser);
    const username=localStorage.getItem("username");
    const userId=localStorage.getItem("userId");
    const onAddTaskHndler=async(newTask)=>{
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/tasks/${username}.json`,{
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
      fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/tasks/${username}/${taskId}.json`)
      .then(response=> response.json())
      .then(responseData=>{
          console.log("SILINECEK TASK:", responseData);
          const isRemovedDataDone=responseData.done;
          const isRemovedDataOut=responseData.outOfDate;
          if(isRemovedDataDone===true){
              dispatch(doneOutNumberActions.done(numberOfDone-1))
          }
          if(isRemovedDataOut===true){
              dispatch(doneOutNumberActions.out(numberOfOut-1))
          }
          fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/tasks/${username}/${taskId}.json`,{
          method:'DELETE',
          })
         .then(response=>{
            dispatchTask({type:'DELETE', id:taskId});
          }).catch(error=>{
           setError("Something went wrong");
          })
      })
     }

    const onSearchHandler=useCallback((filteredData)=>{
        //setTask(filteredData);
        console.log("filtered data", filteredData);
        dispatchTask({type:'FILTER', filteredData:filteredData});
    }, []);
    
    const onDoneHandler=useCallback((newDoneTasks)=>{
        console.log("NEW DONE TO BE MAKING DONE", newDoneTasks);
        const taskId=newDoneTasks.id;
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/tasks/${username}/${taskId}.json`,{
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
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/tasks/${username}/${taskId}.json`,{
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
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/tasks/${username}/${taskId}.json`,{
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
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/tasks/${username}.json`)
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
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/tasks/${username}.json`)
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
        fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/tasks/${username}.json`)
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
   
     //console.log("current user", currentUser);
    
    return(
     <div>
      {error && <ErrorModal onClose={()=>{setError(!error)}}>Something went wrong!</ErrorModal>}
       <TaskForm label="task"  addTask={onAddTaskHndler} loginUser/>
       <Filter filterHandler={onSearchHandler} tasks={userTask} loginUser={loginUser}/>
       <TaskList currentUser={user} tasks={userTask} deleteTask={removeItem} makeItDone={onDoneHandler} makeItOutOf={onOutOfDateHandler} makeItUnstatus={onMakeItUnStatusHandler} showDone={showDoneTasks} showAll={onShowAllHandler} showOut={onShowOutTasks} />
     </div>
    );
};
export default Tasks;