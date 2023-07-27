import { Button, Container, Grid, useMediaQuery } from "@mui/material";
import { useEffect, useRef } from "react";
import "@fontsource/roboto";
import Typed from "typed.js";

function WelcomeBody() {
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

    const typedRef = useRef(null);

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


    return (
        <Container maxWidth="xl">
            <Grid container spacing={2} alignItems="center" style={{ marginTop: "70px" }}>
                <Grid item xs={isLargeScreen ? 6 : 12} order={isLargeScreen ? 1 : 2}>
                    <h1 style={{ marginTop: "0px", textAlign: "center", fontFamily: "cubano" }} className="header-title">Learn to <span style={{ color: "rgb(236, 102, 82)" }} className="typed-header"></span></h1>
                    <h3 style={{ marginTop: "15px", textAlign: "center", color: "#d5ebf7", letterSpacing: "1px", fontFamily: "roboto"}}>Learn and sharpen your skill with <span style={{ fontWeight: "bold" }}>Study Map</span></h3>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "20px" }}>
                        <Button sx={{
                            width: "130px",
                            fontFamily: "cubano",
                            letterSpacing: "1px"
                        }} variant="outlined" color="light">Log in</Button>
                        <Button sx={{
                            width: "130px",
                            fontFamily: "cubano",
                            letterSpacing: "1px",
                            marginTop: "15px",
                            color: "black"
                        }} variant="contained" color="light">Sign Up</Button>
                    </div>
                </Grid>
                <Grid item xs={isLargeScreen ? 6 : 12} style={{ display: "flex", justifyContent: "center" }} order={isLargeScreen ? 2 : 1}>
                    <img src="/woman.png" style={{ width: "350px", margin: '0 auto', maxWidth: "100%" }} alt="Welcome" />
                </Grid>
            </Grid>
        </Container>
    )
}

export default WelcomeBody;