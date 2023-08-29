import { Alert, Button, Card, CardActions, CardContent, CardMedia, Chip, Rating, Snackbar, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./ContentItem.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function ContentItem({ id, type, title, imageSrc, authorName, authorImageSrc, hideOverview, price }) {
    const navigate = useNavigate();

    const [snackbar, setSnackbar] = useState(null);

    const onContentClicked = () => {
        if (type === 'Course') {
            navigate(`/course/${id}`);
        } else {
            navigate(`/map/${id}`)
        }
    }

    const addToCart = () => {
        const existingCartItems = localStorage.getItem('cart');
        if (existingCartItems === null) {
            localStorage.setItem('cart', JSON.stringify([id]));
        } else {
            const cartItems = JSON.parse(existingCartItems);
            if (cartItems.find((existingId) => existingId === id)) {
                setSnackbar({
                    severity: 'warning',
                    text: `"${title}" is already in the cart!`
                });
                return;
            }
            cartItems.push(id);
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }

        setSnackbar({
            severity: 'success',
            text: `${title} added to cart!`
        });
    }

    const handleSnackbarClose = (event, reason) => {
        setSnackbar(null);
    }

    const onAuthorClicked = () => {
        navigate('/author/ketevan-bachalashvili');
    }

    return (
        <Card style={{ border: "1px solid white" }}>
            <div style={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="180"
                    image={imageSrc}
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={onContentClicked}
                />
                <Chip label={type} style={{ position: 'absolute', top: 5, right: 5, backgroundColor: "#EC6652" }} />
            </div>
            <CardContent style={{ background: "#121212", color: "white" }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer"
                }} onClick={onContentClicked}>
                    <Typography className="content-title">{title}</Typography>
                    {type === 'Course' ? <Typography className="">{price !== null && price > 0 ? `$${(Math.round(price * 100) / 100).toFixed(2)}` : 'FREE'}</Typography> : <></>}
                </div>
                <div className="content-author-wrapper">
                    <img alt="mee" src={authorImageSrc ? "http://" + window.location.hostname + ":8080/image/" + authorImageSrc : '/default-icon.png'} />
                    <Typography className="content-author" onClick={onAuthorClicked}>{authorName}</Typography>
                </div>
                <div className="content-rating-wrapper">
                    <Typography className="content-rating-text">5/5</Typography>
                    <Rating
                        name="simple-controlled"
                        size="small"
                        precision={0.5}
                        value={5}
                        readOnly
                        color="dark"
                    />
                    <Typography className="content-rating-count">(125)</Typography>
                </div>
            </CardContent>
            <CardActions style={{ background: "#121212", color: "white", display: "flex", justifyContent: "space-between" }}>
                {hideOverview ? <></> : <Button size="small" onClick={() => { onContentClicked() }}><VisibilityIcon></VisibilityIcon>&nbsp;OverView</Button>}
                {type === 'Course' ? <Button onClick={addToCart} size="small"><AddShoppingCartIcon></AddShoppingCartIcon>&nbsp;Add to Cart</Button> : <></>}
            </CardActions>
            <Snackbar open={snackbar != null}
                onClose={handleSnackbarClose}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert variant="filled"
                    onClose={handleSnackbarClose}
                    style={{ color: 'white' }}
                    severity={snackbar != null ? snackbar.severity : 'warning'}
                    sx={{ width: '100%' }}>
                    {snackbar !== null ? snackbar.text : null}
                </Alert>
            </Snackbar>
        </Card>
    )
}

export default ContentItem;