import { Typography } from "@mui/material";

function CourseObjectives({objectives}) {
    return (<div style={{marginTop: "20px"}}>
        <Typography variant="h6" fontWeight={"bold"}>What you'll learn</Typography>
        <Typography style={{marginTop: "10px", color: "rgba(255, 255, 255, 0.9)"}}>{objectives}</Typography>
    </div>)
}

export default CourseObjectives;