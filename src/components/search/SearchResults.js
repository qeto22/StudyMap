import { Grid, useMediaQuery } from "@mui/material";
import ContentItem from "../welcome/ContentItem";

function SearchResults() {
    const isBiggerThanLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));
    const isBiggerThanMediumScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
    const itemSize = isBiggerThanLargeScreen ? 4 : isBiggerThanMediumScreen ? 6 : 12;

    return (
        <Grid container spacing={5} alignItems="center">
            <Grid item xs={itemSize}>
                <ContentItem type={'Course'}
                    title={'How to work at Google'}
                    imageSrc={"https://cdn.dribbble.com/users/1189961/screenshots/3546540/14._google_-_pixel_art_logo.jpg"}
                    authorName={'Ketevan Bachalashvili'}></ContentItem>
            </Grid>
            <Grid item xs={itemSize}>
                <ContentItem type={'Course'}
                    title={'How to work at Google'}
                    imageSrc={"https://cdn.dribbble.com/users/1189961/screenshots/3546540/14._google_-_pixel_art_logo.jpg"}
                    authorName={'Ketevan Bachalashvili'}></ContentItem>
            </Grid>
            <Grid item xs={itemSize}>
                <ContentItem type={'Course'}
                    title={'How to work at Google'}
                    imageSrc={"https://cdn.dribbble.com/users/1189961/screenshots/3546540/14._google_-_pixel_art_logo.jpg"}
                    authorName={'Ketevan Bachalashvili'}></ContentItem>
            </Grid>
            <Grid item xs={itemSize}>
                <ContentItem type={'Course'}
                    title={'How to work at Google'}
                    imageSrc={"https://cdn.dribbble.com/users/1189961/screenshots/3546540/14._google_-_pixel_art_logo.jpg"}
                    authorName={'Ketevan Bachalashvili'}></ContentItem>
            </Grid>
        </Grid>
    );
}

export default SearchResults;