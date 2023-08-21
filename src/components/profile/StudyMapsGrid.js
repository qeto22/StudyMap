import { Grid } from "@mui/material";
import AddGridItem from "./AddGridItem";
import ContentItem from "../welcome/CourseItem";

function StudyMapsGrid() {
    return (
        <Grid container>
            <Grid item md={4} style={{ padding: "0 10px" }}>
                <ContentItem type={'Map'}></ContentItem>
            </Grid>
            <Grid item md={4} style={{ padding: "0 10px" }}>
                <ContentItem type={'Map'}></ContentItem>
            </Grid>
            <Grid item md={4} style={{ padding: "0 10px" }}>
                <AddGridItem />
            </Grid>
        </Grid>
    )
}

export default StudyMapsGrid;
