import ReviewInput from "./ReviewInput";
import Review from "./Review";
import { Typography } from "@mui/material";

function Reviews() {
    return (<div style={{
    }}>
        <Typography variant="h5" style={{fontFamily: "cubano"}}>Reviews</Typography>
        <ReviewInput></ReviewInput>
        <Review></Review>
    </div>)
}

export default Reviews;