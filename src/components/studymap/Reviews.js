import ReviewInput from "./ReviewInput";
import Review from "./Review";
import { Typography } from "@mui/material";

function Reviews() {
    return (<div style={{
    }}>
        <Typography variant="h5" style={{ fontFamily: "cubano" }}>Reviews</Typography>
        <ReviewInput/>
        <Review
            reviewText="This roadmap is so cool. It helped me a lot. This is super duper. JUST WOW"
            reviewAuthor="Phoebe Buffay"
            ratingValue='5'
        ></Review>
        <Review
            reviewText="This roadmap is amazing! It exceeded my expectations. I can't believe how helpful this roadmap is. Highly recommended!
                    Wow, just wow. This roadmap has transformed my perspective.
                    An invaluable resource that I wish I had found sooner."
            reviewAuthor="Nani Balakhadze"
            ratingValue='4'
        ></Review>
        <Review
            reviewText="I'm so grateful for this roadmap. It's simplified a complex subject for me. The depth of insights and the clear explanations
                    have made it my go-to resource. I can't thank the creators enough for putting together such an incredible guide."
            reviewAuthor="Keti Bachalashvili"
            ratingValue='5'
        ></Review>
        <Review
            reviewText="The author's expertise shines through in every section of this roadmap. The detailed breakdowns and real-world examples
                    have been instrumental in expanding my understanding. This roadmap is worth every minute spent exploring it."
            reviewAuthor="Saba Khukhunashvili"
            ratingValue='4.5'
        ></Review>
        <Review
            reviewText="I'm impressed by the practical examples provided in this roadmap. They bridge the gap between theory and application,
                    making complex concepts understandable. It's like having a mentor guiding you through the learning journey."
            reviewAuthor="Tekla Basilidze"
            ratingValue='4.8'
        ></Review>
        <Review
            reviewText="This roadmap has saved me hours of research. Thank you! The comprehensive coverage and the way everything is organized
                    have made my learning process efficient and enjoyable. I can't recommend this roadmap enough to fellow learners."
            reviewAuthor="Haley James Scott"
            ratingValue='5'
        ></Review>
        <Review
            reviewText="Clear, concise, and incredibly insightful. A must-read for beginners. Whether you're new to the subject or looking to
                    refresh your knowledge, this roadmap offers a holistic view that is hard to find elsewhere. A true gem!"
            reviewAuthor="Kai kaci"
            ratingValue='4'
        ></Review>
        
    </div>)
}

export default Reviews;