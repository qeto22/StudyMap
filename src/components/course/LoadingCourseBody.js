import { Card, CardContent, Container, Divider, Grid, Skeleton, useMediaQuery } from "@mui/material";

function LoadingCourseBody() {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

    return (
        <Container maxWidth="lg" style={{ marginTop: "50px", marginBottom: "25px" }}>
            <Grid container>
                <Grid item xs={12} md={7}>
                    <Skeleton variant="text" height={45} />
                    <Skeleton variant="text" height={45} />
                    <Skeleton variant="text" height={90} />
                    <Divider style={{ marginTop: "15px" }}></Divider>
                    <Skeleton variant="text" height={45} style={{ marginTop: "15px" }} />
                    <Skeleton variant="text" height={90} />
                    <Divider style={{ marginTop: "15px" }}></Divider>
                    <Skeleton variant="text" height={45} style={{ marginTop: "15px" }} />
                    
                    <Skeleton variant="text" height={45} style={{ marginTop: "25px" }}  />
                    <Skeleton variant="text" height={45} />
                    <Skeleton variant="text" height={45} />
                    <Skeleton variant="text" height={45} />
                </Grid>
                <Grid item md={0.5}></Grid>
                <Grid item xs={12} md={4.5}>
                    <Card style={{ width: isSmallScreen ? "100%" : "90%", margin: "0 auto", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
                        {/* <CardMedia sx={{ height: "200px" }} image="https://cdn.dribbble.com/users/1189961/screenshots/3546540/14._google_-_pixel_art_logo.jpg"></CardMedia> */}
                        <Skeleton variant="rectangular" height={200} width="100%"></Skeleton>
                        <CardContent style={{ background: "#12181B" }}>
                            <Skeleton variant="text" height={45} />
                            <Skeleton variant="text" height={45} style={{ marginTop: "15px" }} />
                            <Skeleton variant="text" height={45} />
                            <Divider></Divider>
                            <Skeleton variant="text" height={45} />
                            <Skeleton variant="text" height={45} style={{ marginTop: "15px" }} />
                            <Skeleton variant="text" height={45} />
                            <Skeleton variant="text" height={45} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default LoadingCourseBody;