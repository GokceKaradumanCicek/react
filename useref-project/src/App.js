import React,{useState,useEffect, useRef} from 'react';
function App() {
  const [name, setName]=useState('');
  const renderedCount=useRef(0);
  const inputRef=useRef();

  useEffect(()=>{
    renderedCount.current=renderedCount.current +1;
  })

  function focus(){
    console.log('!!!!!!!');
    console.log(inputRef.current);
  }
  return (
   <div>
     <input ref={inputRef} value={name} onChange={(e)=>setName(e.target.value)} />
     <div>My name is {name}</div>
     <div>I rendered {renderedCount.current} times.</div>
     <button onClick={focus}>Focus</button>
   </div>
  );
}

export default App;
