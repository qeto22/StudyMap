import CartItem from './CartItem';
import "./Cart.css"
import { Divider, Typography } from '@mui/material';

const Cart = ({ cartItems, removeCartItem }) => {

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
            <CartItem key={index} item={item} onRemove={removeCartItem} />
            <Divider style={{ marginTop: "10px" }}></Divider>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
