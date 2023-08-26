import { Button, Rating, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function CourseTitle({ courseTitle, authorName, description, rating }) {
    return (<div>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>{courseTitle}</Typography>
        <div style={{ display: "flex", alignContent: "center", marginTop: "8px", gap: "15px" }}>
            <Rating precision={0.5} value={4.5} style={{ alignItems: "center" }} readOnly size="small" />
            <Typography style={{ color: "rgba(255, 255, 255, 0.8)" }}>By {authorName}</Typography>
        </div>
        <Typography style={{ marginTop: "25px" }}>{description}</Typography>
        <Button sx={{
            width: "250px",
            fontFamily: "cubano",
            letterSpacing: "1px",
            marginTop: "25px",
            marginBottom: "25px"
        }} startIcon={<PlayArrowIcon></PlayArrowIcon>} variant="outlined">View Sample Video</Button>
    </div>)
}

export default CourseTitle;