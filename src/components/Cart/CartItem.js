import { Button, Grid, Rating, Typography } from "@mui/material";
import "./CartItem.css"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="cart-item">
      <Grid container>
        <Grid item md={1.5} style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={item.image} alt={item.title} style={{ width: '30px', height: '30px' }} />
        </Grid>
        <Grid item md={4}>
          <Typography variant="h6" style={{fontWeight: "bold"}}>{item.title}</Typography>
          <Typography style={{color: "rgba(255, 255, 255, 0.7)"}}>{item.author}</Typography>
        </Grid>
        <Grid item md={2} style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Rating
            name="simple-controlled"
            size="small"
            precision={0.5}
            value={5}
            readOnly
            color="dark"
          />
        </Grid>
        <Grid item md={2}  style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="price">
            ${item.price}
          </div>
        </Grid>
        <Grid item md={2.5}  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button variant="contained" className="remove-button" color="material" onClick={() => onRemove(item)}><DeleteOutlineIcon /> Remove </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartItem;