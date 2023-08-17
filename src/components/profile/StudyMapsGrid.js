import { Grid } from "@mui/material";
import AddGridItem from "./AddGridItem";

function StudyMapsGrid() {
    return (
        <Grid container>
            <Grid item md={4} style={{height: "150px"}}>
                <AddGridItem />
            </Grid>
        </Grid>
    )
}

export default StudyMapsGrid;
