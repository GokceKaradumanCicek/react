import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import React,{Fragment, useState} from 'react';
import Cart from "./components/Card/Cart";
import CardProvider from "./store/CardProvider";
function App() {
  const [cartIsShown, setCartIsShown]=useState(false);

  const showCartHandlerFunction=()=>{
    setCartIsShown(true);
  }
  const hideCartHandlerFunction=()=>{
    setCartIsShown(false);
  }
  return (
    <CardProvider>
      {cartIsShown && <Cart onClose={hideCartHandlerFunction} />}
      <Header onShowCart={showCartHandlerFunction} />
        <main>
          <Meals />
        </main>
    </CardProvider>
  );
}

export default App;
