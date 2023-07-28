import { Container, Grid, Hidden } from "@mui/material";

function Footer() {
    return (
        <Container maxWidth="xl">
            <Grid container alignItems="stretch" style={{ height: "100%" }}>
                <Grid item xs={12} md={3} style={{ display: "flex", flexDirection: "column", gap: "15px", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", fontFamily: "cubano", fontSize: "16px", margin: "0 auto", justifyContent: "center" }}>
                        <img
                            src="/logo.png"
                            alt="Logo"
                            style={{ display: "inline-block", width: "32px", height: "32px", marginRight: "15px" }}
                        ></img> StudyMap
                    </div>
                    <div style={{ fontFamily: "roboto", fontSize: "14px", textAlign: "center", justifySelf: "end", color: "rgba(255, 255, 255, 0.7)" }}>
                        @ StudyMap. 2023. <br />
                        All Rights reserved.
                    </div>
                </Grid>
                <Hidden mdDown >
                    <Grid item xs={0} md={9} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "18px", fontSize: "14px", color: "rgba(255, 255, 255, 0.7)" }}>
                            <a style={{ fontFamily: "cubano", color: "white" }}> Legal </a>
                            <a style={{ fontFamily: "roboto" }}> Terms</a>
                            <a style={{ fontFamily: "roboto" }}> Privacy Policy</a>
                            <a style={{ fontFamily: "roboto" }}> Cookies</a>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "18px", fontSize: "14px", color: "rgba(255, 255, 255, 0.7)", marginLeft: "32px" }}>
                            <a style={{ fontFamily: "cubano", color: "white" }}> Contact </a>
                            <a style={{ fontFamily: "roboto" }}> +995 555 55 55 55</a>
                            <a style={{ fontFamily: "roboto" }}> help@studymap.com</a>
                            <a style={{ fontFamily: "roboto" }}> Rustaveli Street, Tbilisi</a>
                        </div>
                    </Grid>
                </Hidden>
            </Grid>
        </Container>
    )
}

export default Footer;