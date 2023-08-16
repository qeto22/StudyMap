import React, { useState } from 'react';
import CartItem from './CartItem'; // Import the CartItem component
import "./Cart.css"
import { Typography } from '@mui/material';

const Cart = ({ initialCartItems }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleRemoveItem = (itemToRemove) => {
    const updatedCart = cartItems.filter(item => item !== itemToRemove);
    setCartItems(updatedCart);
  };

  return (
    <div className="cart-container">
      <Typography style={{
                margin: '10px 40px',
                marginBottom: '40px',
                fontSize: '20px',
                fontFamily: 'cubano',
                textAlign: 'center'
            }}>Check your cart</Typography>
      <div className="cart">
        {cartItems.map((item, index) => (
          <CartItem key={index} item={item} onRemove={handleRemoveItem} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
