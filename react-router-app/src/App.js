import {Route} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import MainHeader from './components/MainHeader';
function App() {
  return (
    <div>
      <header>
        <MainHeader></MainHeader>
      </header>
      <main>
      <Route path="/welcome">
        <Welcome></Welcome>
      </Route>
      <Route path="/products">
        <Products></Products>
      </Route>
      </main>
    </div>
  );
}

export default App;
