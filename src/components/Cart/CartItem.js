import { Rating } from "@mui/material";
import "./CartItem.css"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CartItem = ({ item, onRemove }) => {
    return (
      <div className="cart-item">
        <div className="image">
          <img src={item.image} alt={item.title} style={{width: '60px', height: '60px'}}/>
        </div>
        <div className="details">
          <h3>{item.title}</h3>
          <p>Author: {item.author}</p>
          <Rating style={{ display: 'flex', marginBottom: '20px' }}
                name="simple-controlled"
                size="small"
                precision={0.5}
                value={5}
                readOnly
                color="dark"
            />
        </div>       
        <div className="price">
          ${item.price}
        </div>
        <button className="remove-button" onClick={() => onRemove(item)}>Remove <DeleteOutlineIcon style={{width: '15px', height: '15px'}}/> </button>
      </div>
    );
  };

  export default CartItem;