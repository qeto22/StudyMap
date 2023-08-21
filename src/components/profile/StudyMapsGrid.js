import { Grid } from "@mui/material";
import AddGridItem from "./AddGridItem";
import ContentItem from "../welcome/ContentItem";

function StudyMapsGrid() {
    return (
        <Grid container>
            <Grid item md={4} style={{ padding: "0 10px" }}>
                <ContentItem type={'Map'}
                    title={'How to work at Google'}
                    imageSrc={"https://cdn.dribbble.com/users/1189961/screenshots/3546540/14._google_-_pixel_art_logo.jpg"}
                    authorName={'Ketevan Bachalashvili'}></ContentItem>
            </Grid>
            <Grid item md={4} style={{ padding: "0 10px" }}>
                <ContentItem type={'Map'}
                    title={'How to work at Google'}
                    imageSrc={"https://cdn.dribbble.com/users/1189961/screenshots/3546540/14._google_-_pixel_art_logo.jpg"}
                    authorName={'Ketevan Bachalashvili'}></ContentItem>
            </Grid>
            <Grid item md={4} style={{ padding: "0 10px" }}>
                <AddGridItem />
            </Grid>
        </Grid>
    )
}

export default StudyMapsGrid;
