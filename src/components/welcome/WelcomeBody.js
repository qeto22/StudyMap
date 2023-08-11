import { Button, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import "@fontsource/roboto";
import Typed from "typed.js";
import SkillSlider from "./SkillSlider";
import CourseItem from "./CourseItem";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

function WelcomeBody() {
    const navigate = useNavigate();

    const { isAuthenticated } = useContext(AuthContext);
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

    const typedRef = useRef(null);

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate("/signup")
    }

    useEffect(() => {
        const options = {
            strings: ['Code', 'Drive', 'Hike'], // An array of strings to be typed
            typeSpeed: 100, // Typing speed in milliseconds
            backSpeed: 150, // Backspacing speed in milliseconds
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
                            ) : (<></>) } 
                            
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
                        <Grid item xs={3}>
                            <CourseItem></CourseItem>
                        </Grid>
                        <Grid item xs={3}>
                            <CourseItem></CourseItem>
                        </Grid>
                        <Grid item xs={3}>
                            <CourseItem></CourseItem>
                        </Grid>
                        <Grid item xs={3}>
                            <CourseItem></CourseItem>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}

export default WelcomeBody;