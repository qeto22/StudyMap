import { Button, Container, Grid, Typography } from "@mui/material";
import "./AuthorBody.css";
import CountUp from 'react-countup';
import AnimatedRating from "./AnimatedRating";
import CourseItem from "../welcome/CourseItem"
import HandshakeIcon from '@mui/icons-material/Handshake';

function AuthorBody() {
    return (
        <Container maxWidth="lg" style={{
            marginTop: "30px",
            marginBottom: "40px"
        }}>
            <div className="author-header">
                <img className="author-image" alt="me" src="https://media.licdn.com/dms/image/C4D03AQEV9v3FiWwyuw/profile-displayphoto-shrink_800_800/0/1635665530246?e=2147483647&v=beta&t=3H--_iRB_mZuKpjExzlFiS_PKRwBnfnUMAJhDpoMa5c" />
                <Typography variant="h5" className="author-name">Ketevan Bachalashvili</Typography>
                <Typography variant="h6" className="author-profession">Software Engineer</Typography>
                <Button startIcon={<HandshakeIcon />} variant="contained" color="material" style={{
                    margin: "15px auto 25px auto"
                }}>Hire me as a Mentor</Button>
            </div>
            <div className="author-course-stats">
                <Grid container>
                    <Grid item xs={3} style={{
                        borderLeft: "2px solid white",
                        paddingLeft: "20px"
                    }}>
                        <Typography>Course Count</Typography>
                        <Typography variant="h4" style={{
                            marginTop: "20px",
                            color: "#EC6652",
                            fontWeight: "bold"
                        }}><CountUp start={0} end={4} duration={2} /></Typography>
                    </Grid>
                    <Grid item xs={3} style={{
                        borderLeft: "2px solid white",
                        paddingLeft: "20px"
                    }}>
                        <Typography>Total Course Hours</Typography>
                        <Typography variant="h4" style={{
                            marginTop: "20px",
                            color: "#EC6652",
                            fontWeight: "bold"
                        }}><CountUp start={0} end={240} duration={2} /></Typography>
                    </Grid>
                    <Grid item xs={3} style={{
                        borderLeft: "2px solid white",
                        paddingLeft: "20px"
                    }}>
                        <Typography>Students</Typography>
                        <Typography variant="h4" style={{
                            marginTop: "20px",
                            color: "#EC6652",
                            fontWeight: "bold"
                        }}><CountUp start={0} end={10550} duration={2} /></Typography>
                    </Grid>
                    <Grid item xs={3} style={{
                        borderLeft: "2px solid white",
                        paddingLeft: "20px"
                    }}>
                        <Typography>Average Rating</Typography>
                        <Typography variant="h4" style={{
                            marginTop: "20px",
                            color: "#EC6652",
                            fontWeight: "bold"
                        }}><AnimatedRating /></Typography>
                    </Grid>
                </Grid>
            </div>
            <div className="author-courses">
                <Typography variant="h5">Courses</Typography>
                <Grid container spacing={2} style={{
                    marginTop: "15px"
                }} alignItems="center">
                    <Grid item xs={4}>
                        <CourseItem></CourseItem>
                    </Grid>
                    <Grid item xs={4}>
                        <CourseItem></CourseItem>
                    </Grid>
                    <Grid item xs={4}>
                        <CourseItem></CourseItem>
                    </Grid>
                    <Grid item xs={4}>
                        <CourseItem></CourseItem>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}

export default AuthorBody;