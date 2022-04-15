import Tasks from './components/Tasks';
import Auth from './users/Auth';
import { useAuth } from './context/auth-context'; 
import Layout from './UI/Layout';
import PrivateRoute from "./UI/PrivateRoute";
import UserSign from './users/UserSign';
import { Switch,Route,Redirect } from 'react-router-dom';
import Login from './users/Login';

function App() {
  const{loginUser}=useAuth();
  return (
  <Layout>
    <Switch>
      <PrivateRoute path='/' exact>
        <Redirect to='/login'></Redirect>
      </PrivateRoute>
      <PrivateRoute path='/login' exact>
        <Auth/>
      </PrivateRoute>
      <PrivateRoute path='/UserLogin' exact>
        <Login/>
      </PrivateRoute>
      <PrivateRoute path='/createAccount'>
        <UserSign/>
      </PrivateRoute>
      <PrivateRoute path='/tasks' exact>
        {loginUser? <Tasks/>: <Redirect to="/login"/> }
      </PrivateRoute>
    </Switch>
  </Layout>
  );
}

export default App;
