import { Button, Card, CardActions, CardContent, CardMedia, Chip, Rating, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./CourseItem.css"
import { useNavigate } from "react-router-dom";


function ContentItem({ type }) {
    const navigate = useNavigate();

    const onContentClicked = () => {
        navigate('/course/1/');
    }

    const onAuthorClicked = () => {
        navigate('/author/ketevan-bachalashvili');
    }

    return (
        <Card style={{ border: "1px solid white" }}>
            <div style={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="180"
                    image="https://cdn.dribbble.com/users/1189961/screenshots/3546540/14._google_-_pixel_art_logo.jpg"
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
                    <Typography className="content-title">Path to Google</Typography>
                    <Typography className="">$100.00</Typography>
                </div>
                <div className="content-author-wrapper">
                    <img alt="mee" src="https://media.licdn.com/dms/image/C4D03AQEV9v3FiWwyuw/profile-displayphoto-shrink_800_800/0/1635665530246?e=2147483647&v=beta&t=3H--_iRB_mZuKpjExzlFiS_PKRwBnfnUMAJhDpoMa5c" />
                    <Typography className="content-author" onClick={onAuthorClicked}>Ketevan Bachalashvili</Typography>
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
                <Button size="small" onClick={() => { onContentClicked() }}><VisibilityIcon></VisibilityIcon>&nbsp;OverView</Button>
                {type === 'Course' ? <Button size="small"><AddShoppingCartIcon></AddShoppingCartIcon>&nbsp;Add to Cart</Button> : <></>}
            </CardActions>
        </Card>
    )
}

export default ContentItem;