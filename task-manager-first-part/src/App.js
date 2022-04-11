import Tasks from './components/Tasks';
import Card from './UI/Card';
import Auth from './users/Auth';
import{useContext} from 'react';
import { AuthContext } from './context/auth-context';
import Layout from './UI/Layout';
import MainHeader from './components/MainHeader';
import UserSign from './users/UserSign';
import { Switch,Route,Redirect } from 'react-router-dom';
import Login from './users/Login';

function App() {
  const{isAuth}=useContext(AuthContext);
  console.log("isAuth", isAuth);
  //{isAuth? <Tasks/> : <Auth/>}
  //  {openSubs?<UserSign/>: <Tasks/>}
  return (
  <Layout>
    <Switch>
      <Route path='/' exact>
        <Redirect to='/login'></Redirect>
      </Route>
      <Route path='/login' exact>
        <Auth/>
      </Route>
      <Route path='/UserLogin' exact>
        <Login/>
      </Route>
      <Route path='/createAccount'>
        <UserSign/>
      </Route>
      <Route path='/tasks' exact>
        <Tasks/>
      </Route>
    </Switch>
  </Layout>
  );
}

export default App;
