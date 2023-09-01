import ReviewInput from "./ReviewInput";
import Review from "./Review";
import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";

function Reviews({ reviews, onReviewSubmit }) {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [reviewInputEnabled, setReviewInputEnabled] = useState(false);

    useEffect(() => {
        if (isAuthenticated && user !== null && !reviews.some((review) => review.author.username === user.username)) {
            setReviewInputEnabled(true);
        }
    }, [isAuthenticated, user, reviews]);

    const onReviewSubmitClicked = (review) => {
        onReviewSubmit(review);
        setReviewInputEnabled(false);
    }

    return (<div style={{
    }}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>Reviews</Typography>
        <ReviewInput fieldsEnabled={reviewInputEnabled} onReviewSubmit={onReviewSubmitClicked} />
        {reviews.map((review) => {
            return (<Review
                reviewText={review.reviewText}
                reviewAuthor={review.author}
                rating={review.rating}
            ></Review>)
        })}

    </div>)
}

export default Reviews;