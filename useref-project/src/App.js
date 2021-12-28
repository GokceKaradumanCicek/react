import React,{useState,useEffect, useRef} from 'react';
function App() {
  const [name, setName]=useState('');
  const renderedCount=useRef(0);

  useEffect(()=>{
    renderedCount.current=renderedCount.current +1;
  })
  return (
   <div>
     <input value={name} onChange={(e)=>setName(e.target.value)} />
     <div>My name is {name}</div>
     <div>I rendered {renderedCount.current} times.</div>
   </div>
  );
}

export default App;
