import { Button, Rating, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function CourseTitle() {
    return (<div>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>Learn Python Programming - Beginner to Master</Typography>
        <div style={{ display: "flex", alignContent: "center", marginTop: "8px", gap: "15px" }}>
            <Rating precision={0.5} value={4.5} style={{ alignItems: "center" }} readOnly size="small" />
            <Typography style={{ color: "rgba(255, 255, 255, 0.8)" }}>By Ketevan Bachalashvili</Typography>
        </div>
        <Typography style={{ marginTop: "25px" }}>Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!</Typography>
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