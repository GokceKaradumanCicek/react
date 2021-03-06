import CartContext from './cart-context';
import {useReducer} from 'react';

const defaultCartState={
    items:[],
    totalAmount: 0,
}

const cartReducer=(state,action)=>{
    if(action.type==='ADD'){
        const updatedItems=state.items.concat(action.item);
        const updatedTotalAmount=state.totalAmount+ action.item.price*action.item.amount;
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    return defaultCartState;
}

const CardProvider=(props)=>{
    const [cartState, dispatchCartAction]=useReducer(cartReducer, defaultCartState);
    const addItemToCartHandler=(item)=>{
        dispatchCartAction({type:'ADD', item:item})
    }
    const removeItemFromCartHandler=(id)=>{
        dispatchCartAction({type:'REMOVE', id:id})
    }

    const cartContextHelper={
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
    return <CartContext.Provider value={cartContextHelper}>
        {props.children}
    </CartContext.Provider>
}
export default CardProvider;