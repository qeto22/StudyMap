import { Button, Grid, Rating, Typography } from "@mui/material";
import "./CartItem.css"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CartItem = ({ size, item, onRemove }) => {
  return (
    <Grid container>
      <Grid item md={size === 'small' ? '2' : '1.5'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={`http://localhost:8080${item.imageUrl}`} alt='course icon' style={{ width: '30px', height: '30px' }} />
      </Grid>
      <Grid item md={size === 'small' ? 5 : 4}>
        <Typography style={{ fontWeight: "bold", fontSize: size === 'small' ? "14px" : "16px" }}>{item.title}</Typography>
        <Typography style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: size === "small" ? "13px" : "14px" }}>{item.author.name}</Typography>
      </Grid>
      {size !== 'small' ? (
        <Grid item md={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Rating
            name="simple-controlled"
            size="small"
            precision={0.5}
            value={5}
            readOnly
            color="dark"
          />
        </Grid>
      ) : <></>}
      <Grid item md={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: "14px" }}>
        ${(Math.round(item.price * 100) / 100).toFixed(2)}
      </Grid>
      <Grid item md={size === 'small' ? 3 : 2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button variant="contained" className="remove-button" color="material" onClick={() => onRemove(item.id)}><DeleteOutlineIcon /> {size !== 'small' ? 'Remove' : <></>} </Button>
      </Grid>
    </Grid>
  );
};

export default CartItem;