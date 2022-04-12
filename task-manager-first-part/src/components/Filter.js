import Input from "../UI/Input";
import Card from "../UI/Card";
import React,{useState, useEffect, useRef, useContext} from "react";
import { AuthContext } from "../context/auth-context";
import { DoneOutOfDateContext } from "../context/doneOutOfDate-context";
const Filter =React.memo( props=>{
    const[filtered, setFiltered]=useState('');
    const{loginUserInfo, loginUserId}=useContext(AuthContext);
    const{isShowDone,doneTasksInContext, outOfDateTasksFromContext, unStatusTaskFromContext}=useContext(DoneOutOfDateContext);
    console.log("Filtered", filtered);
    const{filterHandler, tasks}=props;
    const inputRef=useRef();

    console.log("IS SHOW DONE FROM FILTER:", isShowDone);
    console.log("DONE TASKS IN CONTEXT", doneTasksInContext);
    console.log("OUT OF DATE TASKS IN CONTEXT", outOfDateTasksFromContext);
     console.log("FILTER TASK", tasks);
    

    useEffect(()=>{
        const timer=setTimeout(()=>{
            if(filtered === inputRef.current.value){
                const query=(filtered.length===0)? '': `?orderBy="issue"&equalTo="${filtered}"`;
                fetch(`https://task-manager-864b5-default-rtdb.firebaseio.com/${loginUserInfo.username}/${loginUserId}/tasks.json`+query)
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
                let userFilteredTasks=loadedData.filter(t=>t.username===loginUserInfo.username && t.userId===loginUserId);
                console.log("FROM FILTER", userFilteredTasks);
                filterHandler(userFilteredTasks);
            })
            }
            return ()=>{clearTimeout(timer)}
        }, 500)

    }, [filtered, filterHandler, inputRef,doneTasksInContext, outOfDateTasksFromContext, unStatusTaskFromContext]);

    return(
        <Card>
              <div>
                 <Input ref={inputRef} type="text" id="search" label="Search Issue" value={filtered} onChange={event=> setFiltered(event.target.value)}></Input>
                 {tasks.length===0 && <p>Issue is not found!</p>}
             </div>
        </Card>
    )
});
export default Filter;