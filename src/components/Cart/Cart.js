import React, { useState } from 'react';
import CartItem from './CartItem'; // Import the CartItem component
import "./Cart.css"
import { Divider, Typography } from '@mui/material';

const Cart = ({ initialCartItems }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleRemoveItem = (itemToRemove) => {
    const updatedCart = cartItems.filter(item => item !== itemToRemove);
    setCartItems(updatedCart);
  };

  return (
    <div className="cart-container">
      <Typography style={{
        margin: '10px 0',
        fontSize: '20px',
        fontFamily: 'cubano',
        textAlign: 'center',
        width: "100%"
      }}>Check your cart</Typography>
      <Divider></Divider>
      <div className="cart">
        {cartItems.map((item, index) => (
          <div style={{ margin: "5px 0" }}>
            <CartItem key={index} item={item} onRemove={handleRemoveItem} />
            <Divider style={{ marginTop: "10px" }}></Divider>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
