import { Typography } from "@mui/material";

function CourseDescription() {
    return (<div style={{marginTop: "20px"}}>
        <Typography variant="h6" fontWeight={"bold"}>What you'll learn</Typography>
        <Typography style={{marginTop: "10px", color: "rgba(255, 255, 255, 0.9)"}}>If you want to do something useful start by learning Javascript. These days when the browser is central to all computer use knowing "the language of the browser" is the most important step. A few years ago Javascript potential was uncertain and many programmers considered it useless. </Typography>
    </div>)
}

export default CourseDescription;