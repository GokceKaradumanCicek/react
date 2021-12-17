const AddUser = (props) => {
    const addUserHandler=(event)=>{
        event.preventDefault();
        console.log("ıt works!");
    }
  return (
    <div>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">User Name</label>
        <input id="username" type="text" />
        <label htmlFor="age">Age</label>
        <input id="age" type="text" />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};
export default AddUser;
