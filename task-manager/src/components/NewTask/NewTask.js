import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import useHttp from '../../hooks/use-http';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {

  const enterTaskHandler = async (taskText) => {
    const generatedId = taskText.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);   
  };
  const{isLoading, error, sendRequests:fetchNewTask}=useHttp({
    url:'https://test-eaa5f-default-rtdb.firebaseio.com/tasks.json',
    method:'POST',
    body: JSON.stringify({ text: taskText }),
    headers: {
      'Content-Type': 'application/json',
    },
  },enterTaskHandler);
  useEffect( ()=>{ enterTaskHandler() },[]);
  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
