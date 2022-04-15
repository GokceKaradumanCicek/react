import Button from "../UI/Button";
import Input from "../UI/Input";
import Card from "../UI/Card";
import React,{useState, useContext} from "react";
import { AuthContext } from "../context/auth-context";
const TaskForm = props=>{
    const{loginUser}=props;
    const [userTask, setUserTask]=useState({project:'', issue:'', task:'', id:'', username:'', userId:'', done:false, outOfDate:false});  

    const username=localStorage.getItem("username");
    const userId=localStorage.getItem("userId");
    const submitHandler=async(event)=>{
        event.preventDefault();
        await props.addTask(userTask);
    }

    return(
        <Card>
         <form onSubmit={submitHandler}>
             <div>
                 <Input id="project" label="Project" value={userTask.project} onChange={event =>{const newProject=event.target.value; setUserTask((prevState) =>({project:newProject, issue:prevState.issue, task:prevState.task, id:Math.random().toString(),  username:username, userId:userId, done:prevState.done, outOfDate:prevState.outOfDate}))}}></Input>
             </div>
             <div>
                 <Input id="issue" label="Issue" value={userTask.issue} onChange={event => {const newIssue=event.target.value; setUserTask((prevState) =>({project:prevState.project, issue:newIssue, task:prevState.task,  id:Math.random().toString(),  username:username, userId:userId, done:prevState.done, outOfDate:prevState.outOfDate}))}}></Input>
             </div>
             <div>
                 <Input id="task" label="Task"  value={userTask.task} onChange={event=>{ const newTask=event.target.value; setUserTask((prevState) => ({project:prevState.project, issue:prevState.issue, task:newTask,  id:Math.random().toString(),  username:username, userId:userId, done:prevState.done, outOfDate:prevState.outOfDate}))}}></Input>
             </div>
             <div>
               <Button type="submit">Add Task</Button>
             </div>
         </form>
        </Card>
    )
};
export default TaskForm;