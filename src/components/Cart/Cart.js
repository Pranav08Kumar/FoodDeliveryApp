import React, { useState, useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isLoading,setIsloading] = useState(false)
  const [hasLoaded,setHasLoaded] = useState()
  const [isCheck, setIsCheck] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `Rs ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        >
          {item.name}
        </CartItem>
      ))}
    </ul>
  );
  const clickHandler = () => {
    setIsCheck(true);
  };
  const cancelHandler=()=>{
    setIsCheck(false)
  }

  const orderHandler= async(userData)=>{
    setIsloading(true)
    const response = await fetch('https://food-http-277b8-default-rtdb.firebaseio.com/orders.json',{
      method: 'POST',
      body: JSON.stringify({
        user:userData,
        orderedItems: cartCtx.items

      })
    })
    setIsloading(false)
    setHasLoaded(true)
  }
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        close
      </button>
      {hasItems && (
        <button onClick={clickHandler} className={classes.button}>
          order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
    { !isLoading && hasLoaded ? <p>Data has been sent!</p> : 
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheck && <Checkout onCheck={cancelHandler} onCancel={props.onClose} onConfirm={orderHandler}></Checkout>}
      {!isCheck && modalActions}
    </React.Fragment>
    }
    

      </Modal>
  );};

export default Cart;
