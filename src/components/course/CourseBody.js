import { Button, Card, CardContent, CardMedia, Container, Divider, Grid, Rating, Typography, useMediaQuery } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CourseDetailsComponent from "./CourseDetailsComponent";
import CourseTitle from "./CourseTitle";
import CourseDescription from "./CourseDescription";
import CourseSections from "./CourseSections";
import Author from "../studymap/Author";
import Reviews from "../studymap/Reviews";
import Review from "../studymap/Review";

function CourseBody() {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

    return (<Container maxWidth="lg" style={{ marginTop: "50px", marginBottom: "25px" }}>
        <Grid container>
            <Grid item xs={12} md={7}>
                <CourseTitle></CourseTitle>
                <Divider style={{marginTop: "15px"}}></Divider>
                <CourseDescription></CourseDescription>
                <Divider style={{marginTop: "20px"}}></Divider>
                <CourseSections></CourseSections>
            </Grid>
            <Grid item md={0.5}></Grid>
            <Grid item xs={12} md={4.5}>
                <Card style={{ width: isSmallScreen ? "100%" : "90%", margin: "0 auto", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
                    <CardMedia sx={{ height: "200px" }} image="https://cdn.dribbble.com/users/1189961/screenshots/3546540/14._google_-_pixel_art_logo.jpg"></CardMedia>
                    <CardContent style={{ background: "#12181B" }}>
                        <Typography variant="h5">$25.00</Typography>
                        <Button sx={{
                            width: "100%",
                            fontFamily: "cubano",
                            letterSpacing: "1px",
                            marginTop: "15px"
                        }} startIcon={<ShoppingCartIcon></ShoppingCartIcon>} variant="contained" color="material">Add To Cart</Button>
                        <Button sx={{
                            width: "100%",
                            fontFamily: "cubano",
                            letterSpacing: "1px",
                            marginTop: "8px"
                        }} startIcon={<LocalAtmIcon></LocalAtmIcon>} variant="outlined">Buy now</Button>
                        <Divider style={{marginTop: "25px"}}></Divider>
                        <Typography style={{fontFamily: "cubano", marginTop: "15px", letterSpacing: "1px"}}>Course Details</Typography>
                        <CourseDetailsComponent></CourseDetailsComponent>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        <Author></Author>
        <Reviews></Reviews>
    </Container>);
}

export default CourseBody;