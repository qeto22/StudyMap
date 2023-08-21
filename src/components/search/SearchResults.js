import { Grid, useMediaQuery } from "@mui/material";
import CourseItem from "../welcome/CourseItem";

function SearchResults() {
    const isBiggerThanLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));
    const isBiggerThanMediumScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
    const itemSize = isBiggerThanLargeScreen ? 4 : isBiggerThanMediumScreen ? 6 : 12;

    return (
        <Grid container spacing={5} alignItems="center">
            <Grid item xs={itemSize}>
                <CourseItem type={'Course'}></CourseItem>
            </Grid>
            <Grid item xs={itemSize}>
                <CourseItem type={'Course'}></CourseItem>
            </Grid>
            <Grid item xs={itemSize}>
                <CourseItem type={'Course'}></CourseItem>
            </Grid>
            <Grid item xs={itemSize}>
                <CourseItem type={'Course'}></CourseItem>
            </Grid>
        </Grid>
    );
}

export default SearchResults;