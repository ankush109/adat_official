import React, { Fragment } from "react";
import CartItemCard from "./cartitems";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link } from "react-router-dom";
import { additemstocart, removefromcart } from "../actions/cartaction";

const Cart = () => {
const {cartitems}=useSelector((state)=>state.cart)
const dispatch =useDispatch()
const navigate =useNavigate()
const increasequantity =(id,quantity,stock)=>{
  const newqty = quantity+1;
  if(stock<=quantity){
    return
  }
  dispatch(additemstocart(id,newqty))
  
}
const decreasequantity =(id,quantity)=>{
  const newqty = quantity-1;
  if(1>=quantity){
    return
  }
  dispatch(additemstocart(id,newqty))
  
}
const deletecartitem =(id)=>{
 dispatch(removefromcart(id))
  
}
const checkouthandler =() =>{
navigate("/login?redirect=shipping")
}
  return (
   <Fragment>
     {cartitems.length === 0 ? (
       <div className="emptyCart">
      <RemoveShoppingCartIcon />
      <Typography>No Product in Your Cart</Typography>
      <Link to="/products">View Products</Link>
       </div>
     ):
     (
       
      <Fragment>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>

        {cartitems &&
          cartitems.map((item) => (
            <div className="cartContainer" key={item.product}>
              <CartItemCard item={item} deletecartitem={deletecartitem} />
              <div className="cartInput">
                <button onClick={()=>decreasequantity(item.product,item.quantity)}>
                  -
                </button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={()=>increasequantity(item.product,item.quantity,item.stock)}>
                  +
                </button>
              </div>
              <p className="cartSubtotal">{`₹${
                item.price * item.quantity
              }`}</p>
            </div>
          ))}

        <div className="cartGrossProfit">
          <div></div>
          <div className="cartGrossProfitBox">
            <p>Gross Total</p>
         <p>{`₹${cartitems.reduce(
           (acc,item)=>acc +item.quantity * item.price,0
         )}`}</p> 
          </div>
          <div></div>
          <div className="checkOutBtn">
            <button onClick={checkouthandler} >Check Out</button>
          </div>
        </div>
      </div>
    </Fragment>

     )}
   </Fragment>
  )
};

export default Cart;