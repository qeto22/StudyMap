import { Alert, Button, Card, CardContent, CardMedia, Container, Divider, Grid, Snackbar, Typography, useMediaQuery } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LoadingCourseBody from './LoadingCourseBody'
import CourseDetailsComponent from "./CourseDetailsComponent";
import CourseTitle from "./CourseTitle";
import CourseObjectives from "./CourseDescription";
import CourseSections from "./CourseSections";
import Author from "../studymap/Author";
import Reviews from "../studymap/Reviews";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

function CourseBody({ course }) {
    const { isAuthenticated } = useContext(AuthContext);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const navigate = useNavigate();

    const buyNowClicked = () => {
        if (!isAuthenticated) {
            setSnackBarOpen(true);
        };
    }

    const addToCart = () => {
        const existingCartItems = localStorage.getItem('cart');
        if (existingCartItems === null) {
            localStorage.setItem('cart', JSON.stringify([course.id]));
        } else {
            const cartItems = JSON.parse(existingCartItems);
            if (cartItems.find((existingId) => existingId === course.id)) {
                return;
            }
            cartItems.push(course.id);
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }

    useEffect(() => {
        if (snackBarOpen) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [snackBarOpen, navigate]);

    if (course === null) {
        return (<LoadingCourseBody></LoadingCourseBody>)
    };

    return (<Container maxWidth="lg" style={{ marginTop: "50px", marginBottom: "25px" }}>
        <Grid container>
            <Grid item xs={12} md={7}>
                <CourseTitle courseTitle={course.title} authorName={course.author.name} description={course.description}></CourseTitle>
                <Divider style={{ marginTop: "15px" }}></Divider>
                <CourseObjectives objectives={course.objectives}></CourseObjectives>
                <Divider style={{ marginTop: "20px" }}></Divider>
                <CourseSections sections={course.sections} showTitle={true}></CourseSections>
            </Grid>
            <Grid item md={0.5}></Grid>
            <Grid item xs={12} md={4.5}>
                <Card style={{ width: isSmallScreen ? "100%" : "90%", margin: "0 auto", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
                    <CardMedia sx={{ height: "200px" }} image={'http://' + window.location.hostname + `:8080${course.imageUrl}`}></CardMedia>
                    <CardContent style={{ background: "#12181B" }}>
                        <Typography variant="h5">{course.price !== null && course.price > 0 ? `$${(Math.round(course.price * 100) / 100).toFixed(2)}` : 'FREE'}</Typography>
                        <Button sx={{
                            width: "100%",
                            fontFamily: "cubano",
                            letterSpacing: "1px",
                            marginTop: "15px"
                        }} onClick={addToCart} startIcon={<ShoppingCartIcon></ShoppingCartIcon>} variant="contained" color="material">Add To Cart</Button>
                        <Button onClick={buyNowClicked} sx={{
                            width: "100%",
                            fontFamily: "cubano",
                            letterSpacing: "1px",
                            marginTop: "8px"
                        }} startIcon={<LocalAtmIcon></LocalAtmIcon>} variant="outlined">Buy now</Button>
                        <Divider style={{ marginTop: "25px" }}></Divider>
                        <Typography style={{ fontFamily: "cubano", marginTop: "15px", letterSpacing: "1px" }}>Course Details</Typography>
                        <CourseDetailsComponent></CourseDetailsComponent>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        <Author author={{
            username: course.author.username,
            imageUrl: course.author.imageUrl,
            name: course.author.name,
            description: course.author.description
        }}></Author>
        <Reviews></Reviews>
        <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={snackBarOpen}>
            <Alert severity="warning" sx={{ width: '100%' }} variant="filled" style={{color: "white"}}>
                You are not logged in!
            </Alert>
        </Snackbar>
    </Container>);
}

export default CourseBody;