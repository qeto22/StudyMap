import { Button, Card, CardActions, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
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
                <Typography className="course-title">Path to Google</Typography>
                <div className="course-author-wrapper">
                    <img alt="mee" src="https://scontent.ftbs4-2.fna.fbcdn.net/v/t39.30808-6/334927478_557547446353999_719690127249826865_n.jpg?_nc_cat=101&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=S-QTKw7kRGcAX_3Vuj3&_nc_oc=AQnCaFYxT4FFjJ7xHbN8eH_c5FVYdSs6VDtQytI9lqck19f4fDhNnJJmf4P_aozFPDE&_nc_ht=scontent.ftbs4-2.fna&oh=00_AfBuSvgl5CGfrsUAyZxMKnKxsnR7_4nS6zJ1zYurQoOHgA&oe=64CB92F8" />
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
                <Typography style={{marginLeft: "7px"}}>$100.00</Typography>
                <Button size="small"><AddShoppingCartIcon></AddShoppingCartIcon>&nbsp;Add to Cart</Button>
            </CardActions>
        </Card>
    )
}

export default CourseItem;