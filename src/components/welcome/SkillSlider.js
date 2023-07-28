import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SkillSlider.css";
import Slider from "react-slick";
import { Card, CardContent, Typography, useMediaQuery } from "@mui/material";

function SkillSlider() {
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

    const settings = {
        infinite: true,
        slidesToScroll: 1,
        autoplay: !isLargeScreen,
        speed: 6000,
        autoplaySpeed: 1,
        variableWidth: true,
        cssEase: "linear",
        draggable: false,
        arrows: false
    };

    const styles = {
        cardcontent: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "15px 0",
            "&:last-child": {
                paddingBottom: 0
            },
            background: "#121212"
        }
    };

    return (
        <Slider {...settings} style={{maxWidth: "98.7%"}}>
            <Card style={{ width: "200px" }} variant="outlined">
                <CardContent style={styles.cardcontent}>
                    <img src="/coding.png" alt="coding" style={{ width: "32px", height: "32px" }} />
                    <Typography style={{ color: "white", textAlign: "center", lineHeight: "32px", marginLeft: "10px" }}>
                        Coding
                    </Typography>
                </CardContent>
            </Card>
            <Card style={{ width: "200px" }} variant="outlined">
                <CardContent style={styles.cardcontent}>
                    <img src="/data-analysis.png" alt="coding" style={{ width: "32px", height: "32px" }} />
                    <Typography style={{ color: "white", textAlign: "center", lineHeight: "32px", marginLeft: "10px" }}>
                        Data Analysis
                    </Typography>
                </CardContent>
            </Card>
            <Card style={{ width: "200px" }} variant="outlined">
                <CardContent style={styles.cardcontent}>
                    <img src="/seo.png" alt="coding" style={{ width: "32px", height: "32px" }} />
                    <Typography style={{ color: "white", textAlign: "center", lineHeight: "32px", marginLeft: "10px" }}>
                        Digital Marketing
                    </Typography>
                </CardContent>
            </Card>
            <Card style={{ width: "200px" }} variant="outlined">
                <CardContent style={styles.cardcontent}>
                    <img src="/graphic-design.png" alt="coding" style={{ width: "32px", height: "32px" }} />
                    <Typography style={{ color: "white", textAlign: "center", lineHeight: "32px", marginLeft: "10px" }}>
                        Graphic Design
                    </Typography>
                </CardContent>
            </Card>
            <Card style={{ width: "200px" }} variant="outlined">
                <CardContent style={styles.cardcontent}>
                    <img src="/business.png" alt="coding" style={{ width: "32px", height: "32px" }} />
                    <Typography style={{ color: "white", textAlign: "center", lineHeight: "32px", marginLeft: "10px" }}>
                        Business
                    </Typography>
                </CardContent>
            </Card>
            <Card style={{ width: "200px" }} variant="outlined">
                <CardContent style={styles.cardcontent}>
                    <img src="/languages.png" alt="coding" style={{ width: "32px", height: "32px" }} />
                    <Typography style={{ color: "white", textAlign: "center", lineHeight: "32px", marginLeft: "10px" }}>
                        Languages
                    </Typography>
                </CardContent>
            </Card>

        </Slider>
    );
}

export default SkillSlider;
