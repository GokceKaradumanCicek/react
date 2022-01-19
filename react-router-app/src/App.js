import {Route} from 'react-router-dom';
import ManinHeader from './components/MainHeader';
import Products from './pages/Products';
import Welcome from './pages/Welcome';
function App() {
  return (
    <div>
    <header><ManinHeader></ManinHeader></header>
    <main>
      <Route path='/welcome'>
        <Welcome></Welcome>
      </Route>
      <Route path='/products'>
        <Products></Products>
      </Route>
    </main>
    </div>
  );
}

export default App;
