import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import React,{Fragment} from 'react';
import Cart from "./components/Card/Cart";
function App() {
  return (
    <Fragment>
      <Cart />
      <Header />
        <main>
          <Meals />
        </main>
    </Fragment>
  );
}

export default App;
