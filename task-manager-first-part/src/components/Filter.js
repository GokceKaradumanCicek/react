import Input from "../UI/Input";
import Card from "../UI/Card";
import React,{useState, useEffect, useRef, useContext} from "react";
import { AuthContext } from "../context/auth-context";
import { DoneOutOfDateContext } from "../context/doneOutOfDate-context";
const Filter =React.memo( props=>{
    const[filtered, setFiltered]=useState('');
    const{userInformation}=useContext(AuthContext);
    const{isShowDone,doneTasksInContext, outOfDateTasksFromContext, unStatusTaskFromContext, setNumberOfDone, setNumberOfOut, numberOfDoneTask, numberOfOutTask}=useContext(DoneOutOfDateContext);
    console.log("Filtered", filtered);
    const{filterHandler, tasks}=props;
    const inputRef=useRef();

    console.log("IS SHOW DONE FROM FILTER:", isShowDone);
    console.log("DONE TASKS IN CONTEXT", doneTasksInContext);
    console.log("OUT OF DATE TASKS IN CONTEXT", outOfDateTasksFromContext);
    console.log("FILTER TASK", tasks); 
    console.log("USER INFORMATION:", userInformation);
    const username=localStorage.getItem("username");
    const userId=localStorage.getItem("userId");

    useEffect(()=>{
        const timer=setTimeout(()=>{
            if(filtered === inputRef.current.value){
                const query=(filtered.length===0)? '': `?orderBy="issue"&equalTo="${filtered}"`;
                fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/tasks/${username}.json`+query)
                .then(response => response.json())
                .then(responseData =>{
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
                let userFilteredTasks=loadedData.filter(t=>t.username===username && t.userId===userId);
                let numberOfDoneTask=(userFilteredTasks.filter(t=>t.username===username && t.userId===userId && t.done===true)).length;
                console.log("NUMBER OF DONE:", numberOfDoneTask);
                let numberOfOutTask=(userFilteredTasks.filter(t=>t.username===username && t.userId===userId && t.done===true)).length;
                console.log("NUMBER OF OUT:", numberOfOutTask);
                setNumberOfDone(numberOfDoneTask);
                setNumberOfOut(numberOfOutTask);
                filterHandler(userFilteredTasks);
            })
            }
            return ()=>{clearTimeout(timer)}
        }, 500)

    }, [filtered, filterHandler, inputRef,doneTasksInContext, outOfDateTasksFromContext, unStatusTaskFromContext, numberOfDoneTask, numberOfOutTask]);


    return(
        <Card>
              <div>
                 <Input ref={inputRef} type="text" id="search" label="Search Issue" value={filtered} onChange={event=> setFiltered(event.target.value)}></Input>
                 {(tasks.length===0 && filtered!=='') && <p>Issue is not found!</p>}
             </div>
        </Card>
    )
});
export default Filter;