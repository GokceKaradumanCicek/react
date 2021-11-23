import React ,{useState}from 'react';
import AddUser from './Components/User/AddUser';
import UsersList from './Components/User/UsersList';

function App() {
  const [usersList, setUsersList]=useState([]);
  const addUserHandler=(uName,uSurname,uAge)=>{
    setUsersList((prevUsersList)=>{
      return [...prevUsersList, {name:uName, surname:uSurname, age:uAge, id:Math.random().toString()}];
    });
  }
  return (
    <div>
      <AddUser onAddUser={addUserHandler}></AddUser>
      <UsersList users={usersList}></UsersList>
    </div>
  );
}

export default App;
