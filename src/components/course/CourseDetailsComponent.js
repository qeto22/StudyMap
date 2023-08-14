import { Rating, Typography } from "@mui/material";
import './CourseDetailsComponent.css';

function CourseDetailsComponent() {
    return (<div style={{ marginTop: "15px" }}>
        <div className="course-detail">
            <Typography variant="h7">Rating</Typography>
            <div style={{display: "flex", gap: "3px"}}>
                <Rating precision={0.5} value={4.5} style={{ alignItems: "center" }} readOnly size="small" />
                <Typography variant="h7" style={{color: "rgba(255, 255, 255, 0.6)"}}>(255)</Typography>
            </div>
        </div>
        <div className="course-detail">
            <Typography variant="h7">Total Hours</Typography>
            <Typography variant="h7">158</Typography>
        </div>
        <div className="course-detail">
            <Typography variant="h7">Created On</Typography>
            <Typography variant="h7">Jul 20, 2023</Typography>
        </div>
    </div>);
}

export default CourseDetailsComponent;