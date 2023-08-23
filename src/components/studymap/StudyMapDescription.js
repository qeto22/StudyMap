import { Typography } from "@mui/material";

function StudyMapDescription({ description }) {
    return (<div style={{margin: '30px 0px'}}>
        <Typography variant="h5" style={{fontFamily: "cubano"}}>Description</Typography>
        <p>{description}</p>
    </div>)
}

export default StudyMapDescription;