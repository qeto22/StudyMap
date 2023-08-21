import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Typography } from "@mui/material";
import "./AuthorBody.css";
import CountUp from 'react-countup';
import AnimatedRating from "./AnimatedRating";
import ContentItem from "../welcome/ContentItem"
import HandshakeIcon from '@mui/icons-material/Handshake';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useContext, useState } from "react";
import FormTextInput from "../login/FormTextInput";
import { AuthContext } from "../AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

function AuthorBody() {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const hireMePresent = params.get('hire-me');

    const [isMentorshipRequestDialogOpen, setMentorshipRequestDialogOpen] = useState(hireMePresent !== null);
    const [sessionsCount, setSessionsCount] = useState(1);

    const onHireMeClicked = () => {
        setMentorshipRequestDialogOpen(true);
    };

    const onRequestMentorship = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
    }

    const handleClose = () => {
        setMentorshipRequestDialogOpen(false);
    };

    return (
        <Container maxWidth="lg" style={{
            marginTop: "30px",
            marginBottom: "40px"
        }}>
            <div className="author-header">
                <img className="author-image" alt="me" src="https://media.licdn.com/dms/image/C4D03AQEV9v3FiWwyuw/profile-displayphoto-shrink_800_800/0/1635665530246?e=2147483647&v=beta&t=3H--_iRB_mZuKpjExzlFiS_PKRwBnfnUMAJhDpoMa5c" />
                <Typography variant="h5" className="author-name">Ketevan Bachalashvili</Typography>
                <Typography variant="h6" className="author-profession">Software Engineer</Typography>
                <Card elevation={5} style={{ width: "50%", background: "transparent", padding: "15px", margin: "10px auto", border: "1px solid rgba(255, 255, 255, 0.5)" }}>

                    <Typography variant="h8" >Hello 👋<br /><br /> I'm an experienced software engineer, currently working at AzRy as a Java developer. I've been in this industry for over 2 years and I've gained much experience</Typography>
                </Card>
                <Button startIcon={<HandshakeIcon />}
                    variant="contained"
                    color="material"
                    onClick={onHireMeClicked}
                    style={{
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
                        <ContentItem type={'Course'}
                            title={'How to work at Google'}
                            imageSrc={"https://cdn.dribbble.com/users/1189961/screenshots/3546540/14._google_-_pixel_art_logo.jpg"}
                            authorName={'Ketevan Bachalashvili'}></ContentItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ContentItem type={'Course'}
                            title={'How to work at Google'}
                            imageSrc={"https://cdn.dribbble.com/users/1189961/screenshots/3546540/14._google_-_pixel_art_logo.jpg"}
                            authorName={'Ketevan Bachalashvili'}></ContentItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ContentItem type={'Course'}
                            title={'How to work at Google'}
                            imageSrc={"https://cdn.dribbble.com/users/1189961/screenshots/3546540/14._google_-_pixel_art_logo.jpg"}
                            authorName={'Ketevan Bachalashvili'}></ContentItem>
                    </Grid>
                    <Grid item xs={4}>
                        <ContentItem type={'Course'}
                            title={'How to work at Google'}
                            imageSrc={"https://cdn.dribbble.com/users/1189961/screenshots/3546540/14._google_-_pixel_art_logo.jpg"}
                            authorName={'Ketevan Bachalashvili'}></ContentItem>
                    </Grid>
                </Grid>
            </div>

            <Dialog
                open={isMentorshipRequestDialogOpen}
                onClose={handleClose}
                aria-labelledby="hire-mentor-dialog-title"
                aria-describedby="hire-mentor-dialog-description"
            >
                <DialogTitle id="hire-mentor-dialog-title">Hire Ketevan Bachalashvili</DialogTitle>
                <DialogContent>
                    <DialogContentText id="hire-mentor-dialog-description">
                        <div className="mentorship-session-details">
                            <div className="mentorship-detail">
                                <MonetizationOnIcon style={{
                                    color: "#60d61a"
                                }} /> 25 per Session
                            </div>
                            <div className="mentorship-detail">
                                <SupervisorAccountIcon style={{
                                    color: "#2f81f7"
                                }} /> 2 Sessions Minimum
                            </div>
                        </div>
                        <FormTextInput style={{
                            marginTop: "15px"
                        }} label="Session" type="number" defaultValue={"1"} onChange={(e) => setSessionsCount(Number(e.target.value))} />
                        <FormTextInput style={{
                            marginTop: "8px",
                        }} label="Optional message to Ketevan" defaultValue={"Hello Ketevan,"} multiline={true} />
                        <Divider light style={{
                            marginTop: "15px",
                            marginBottom: "8px",
                            color: "white"
                        }} />
                        <Typography style={{
                            color: "white"
                        }}><span style={{ color: "#EC6652", fontWeight: "bold" }}>Total cost: </span> ${sessionsCount * 25}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onRequestMentorship} color="primary">
                        Request
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default AuthorBody;