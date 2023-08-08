import { Button, Card, CardActions, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import "./CourseItem.css"

function CourseItem() {

    return (
        <Card style={{ border: "1px solid white" }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="180"
                image="https://cdn.dribbble.com/users/1189961/screenshots/3546540/14._google_-_pixel_art_logo.jpg"
            />
            <CardContent style={{ background: "#121212", color: "white" }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Typography className="course-title">Path to Google</Typography>
                    <Typography className="">$100.00</Typography>
                </div>
                <div className="course-author-wrapper">
                    <img alt="mee" src="https://media.licdn.com/dms/image/C4D03AQEV9v3FiWwyuw/profile-displayphoto-shrink_800_800/0/1635665530246?e=2147483647&v=beta&t=3H--_iRB_mZuKpjExzlFiS_PKRwBnfnUMAJhDpoMa5c" />
                    <Typography>Ketevan Bachalashvili</Typography>
                </div>
                <div className="course-rating-wrapper">
                    <Typography className="course-rating-text">5/5</Typography>
                    <Rating
                        name="simple-controlled"
                        size="small"
                        precision={0.5}
                        value={5}
                        readOnly
                        color="dark"
                    />
                    <Typography className="course-rating-count">(125)</Typography>
                </div>
            </CardContent>
            <CardActions style={{ background: "#121212", color: "white", display: "flex", justifyContent: "space-between"}}>
                <Button size="small"><AccountTreeIcon></AccountTreeIcon>&nbsp;Visualize</Button>
                <Button size="small"><AddShoppingCartIcon></AddShoppingCartIcon>&nbsp;Add to Cart</Button>
            </CardActions>
        </Card>
    )
}

export default CourseItem;