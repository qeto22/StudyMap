import { Button, Container, Grid, Hidden, Typography, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import "@fontsource/roboto";
import Typed from "typed.js";
import SkillSlider from "./SkillSlider";
import ContentItem from "./ContentItem";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StudyMapsGrid from "../profile/StudyMapsGrid";
import LoadingContentItem from "../profile/LoadingContentItem";

function WelcomeBody() {
    const navigate = useNavigate();

    const { isAuthenticated } = useContext(AuthContext);
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

    const typedRef = useRef(null);

    const [topCourses, setTopCourses] = useState(null);
    const [topStudyMaps, setTopStudyMaps] = useState(null);

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate("/signup")
    }

    useEffect(() => {
        const options = {
            strings: ['Code', 'Drive', 'Hike', 'Teach'],
            typeSpeed: 100,
            backSpeed: 150,
            backDelay: 300,
            loop: true,
            parse: true
        }

        // Create a new instance of Typed.js
        typedRef.current = new Typed('.typed-header', options);

        return () => {
            typedRef.current.destroy();
        };
    });

    useEffect(() => {
        if (topCourses) {
            return;
        }

        axios.get("http://" + window.location.hostname + ":8080/api/v1/marketing/top-courses")
            .then((response) => {
                setTopCourses(response.data);
            })
            .catch((error) => {
                setTopCourses([]);
                console.error(error);
            });
    }, [topCourses]);

    useEffect(() => {
        if (topStudyMaps) {
            return;
        }

        axios.get("http://" + window.location.hostname + ":8080/api/v1/marketing/top-study-maps")
            .then((response) => {
                setTopStudyMaps(response.data);
            })
            .catch((error) => {
                setTopStudyMaps([]);
                console.error(error);
            });

    }, [topStudyMaps]);

    console.log(topCourses);

    const onExploreClicked = () => {
        navigate('/search')
    }

    return (
        <div>
            <Container maxWidth="xl">
                <Grid container spacing={2} alignItems="center" style={isLargeScreen ? { marginTop: "100px" } : { marginTop: "60px" }}>
                    <Grid item xs={isLargeScreen ? 6 : 12} order={isLargeScreen ? 1 : 2}>
                        <h1 style={{ marginTop: "0px", textAlign: "center", fontFamily: "cubano" }} className="header-title">Learn to <span style={{ color: "rgb(236, 102, 82)" }} className="typed-header"></span></h1>
                        <h3 style={{ marginTop: "15px", textAlign: "center", color: "#d5ebf7", letterSpacing: "1px", fontFamily: "roboto" }}>Learn and sharpen your skill with <span style={{ fontWeight: "bold" }}>Study Map</span></h3>
                        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "20px" }}>
                            {isAuthenticated ? (
                                <Button sx={{
                                    width: "200px",
                                    fontFamily: "cubano",
                                    letterSpacing: "1px",
                                    marginTop: "15px",
                                    color: "black"
                                }} onClick={onExploreClicked} variant="contained" color="light">Explore StudyMaps</Button>
                            ) : (<></>)}

                            {!isAuthenticated ? (
                                <Button onClick={handleLoginClick} sx={{
                                    width: "130px",
                                    fontFamily: "cubano",
                                    letterSpacing: "1px"
                                }} variant="outlined" color="light">Log in</Button>
                            ) : (<></>)}

                            {!isAuthenticated ? (
                                <Button onClick={handleSignupClick} sx={{
                                    width: "130px",
                                    fontFamily: "cubano",
                                    letterSpacing: "1px",
                                    marginTop: "15px",
                                    color: "black"
                                }} variant="contained" color="light">Sign Up</Button>
                            ) : (<></>)}
                        </div>
                    </Grid>
                    <Grid item xs={isLargeScreen ? 6 : 12} style={{ display: "flex", justifyContent: "center" }} order={isLargeScreen ? 2 : 1}>
                        <img src="/woman.png" style={{ width: "350px", margin: '0 auto', maxWidth: "100%" }} alt="Welcome" />
                    </Grid>
                </Grid>
            </Container>
            <div style={{ marginTop: isLargeScreen ? "100px" : "80px", marginBottom: "80px" }}>
                <Container maxWidth="xl" style={{ marginBottom: "25px" }}>
                    <Typography variant="h6" fontFamily="cubano" textAlign="center">
                        Short list of what you can learn at <span style={{ color: "rgb(236, 102, 82)" }}>StudyMap</span>
                    </Typography>
                </Container>
                <SkillSlider />
            </div>
            <div style={{ marginTop: isLargeScreen ? "100px" : "80px", marginBottom: "80px" }}>
                <Container maxWidth="xl" style={{ marginBottom: "25px" }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>

                        <Typography variant="h6" fontFamily="cubano" textAlign="center" height="40px" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            Popular Study Maps
                        </Typography>
                    </div>
                    <Grid container spacing={5} alignItems="center">
                        {topStudyMaps && topStudyMaps.length > 0 ? (topStudyMaps.map((item, index) => (
                            <Grid item xs={12} md={3}>
                                <ContentItem id={item.mapId}
                                    type={'Map'}
                                    title={item.mapTitle}
                                    imageSrc={"http://" + window.location.hostname + ":8080" + item.imagePath}
                                    authorName={item.author.name}></ContentItem>
                            </Grid>
                        ))) : <></>}

                        {topStudyMaps === null || topStudyMaps.length === 0 ? <Grid item xs={12} md={3}>
                            <LoadingContentItem />
                        </Grid> : <></>}
                        {topStudyMaps === null || topStudyMaps.length === 0 ? <Grid item xs={12} md={3}>
                            <LoadingContentItem />
                        </Grid> : <></>}
                        {topStudyMaps === null || topStudyMaps.length === 0 ? <Grid item xs={12} md={3}>
                            <LoadingContentItem />
                        </Grid> : <></>}
                        {topStudyMaps === null || topStudyMaps.length === 0 ? <Grid item xs={12} md={3}>
                            <LoadingContentItem />
                        </Grid> : <></>}
                    </Grid>
                </Container>
            </div>
            <div style={{ marginTop: isLargeScreen ? "100px" : "80px", marginBottom: "80px" }}>
                <Container maxWidth="xl" style={{ marginBottom: "25px" }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>

                        <Typography variant="h6" fontFamily="cubano" textAlign="center" height="40px" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            Popular Courses
                        </Typography>
                    </div>
                    <Grid container spacing={5} alignItems="center">
                        {topCourses && topCourses.length > 0 ? (topCourses.map((item, index) => (
                            <Grid item xs={12} md={3}>
                                <ContentItem id={item.id}
                                    type={'Course'}
                                    title={item.title}
                                    imageSrc={"http://" + window.location.hostname + ":8080" + item.imageUrl}
                                    authorName={item.author.name}></ContentItem>
                            </Grid>
                        ))) : <></>}

                        {topCourses === null || topCourses.length === 0 ? <Grid item xs={12} md={3}>
                            <LoadingContentItem />
                        </Grid> : <></>}
                        {topCourses === null || topCourses.length === 0 ? <Grid item xs={12} md={3}>
                            <LoadingContentItem />
                        </Grid> : <></>}
                        {topCourses === null || topCourses.length === 0 ? <Grid item xs={12} md={3}>
                            <LoadingContentItem />
                        </Grid> : <></>}
                        {topCourses === null || topCourses.length === 0 ? <Grid item xs={12} md={3}>
                            <LoadingContentItem />
                        </Grid> : <></>}
                    </Grid>
                </Container>
            </div>
        </div>
    )
}

export default WelcomeBody;