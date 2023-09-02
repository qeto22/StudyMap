import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Typography } from "@mui/material";
import "./AuthorBody.css";
import CountUp from 'react-countup';
import AnimatedRating from "./AnimatedRating";
import ContentItem from "../welcome/ContentItem"
import HandshakeIcon from '@mui/icons-material/Handshake';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useContext, useEffect, useState } from "react";
import FormTextInput from "../login/FormTextInput";
import { AuthContext } from "../AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { set } from "lodash";

function AuthorBody({ authorUsername }) {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const hireMePresent = params.get('hire-me');

    const [isMentorshipRequestDialogOpen, setMentorshipRequestDialogOpen] = useState(hireMePresent !== null);
    const [sessionsCount, setSessionsCount] = useState(1);

    const [author, setAuthor] = useState(null);
    const [authorCourses, setAuthorCourses] = useState([]);
    const [authorMaps, setAuthorMaps] = useState([]);

    const [errorMessage, setErrorMessage] = useState(null);

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

    const fetchAuthorCourses = () => {
        if (author === null || author.type === 'MENTEE') return;

        axios.get('http://' + window.location.hostname + ':8080/api/v1/course/author/' + authorUsername)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    setAuthorCourses(response.data);
                } else {
                    console.log('Error fetching author courses:');
                }
            })
            .catch(error => {
                console.log('Error fetching author courses:', error);
            });
    };

    const fetchAuthorMaps = () => {
        axios.get('http://' + window.location.hostname + ':8080/api/v1/map/author/' + authorUsername)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    setAuthorMaps(response.data);
                } else {
                    console.log('Error fetching author maps:');
                }
            })
            .catch(error => {
                console.log('Error fetching author maps:', error);
            });
    };

    const getContentRating = () => {
        if (author === null) return 0;

        let totalRating = 0;
        let totalRatingsCount = 0;

        authorCourses.forEach(course => {
            totalRating += course.rating * course.ratingsCount;
            totalRatingsCount += course.ratingsCount;
        });

        authorMaps.forEach(map => {
            totalRating += map.rating * map.ratingsCount;
            totalRatingsCount += map.ratingsCount;
        });

        if (totalRatingsCount === 0) {
            return 0;
        }

        return totalRating / totalRatingsCount;
    };

    useEffect(() => {
        axios.get('http://' + window.location.hostname + ':8080/api/v1/user/' + authorUsername)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    setAuthor(response.data);
                } else {
                    setErrorMessage('Error fetching user data');
                }
            })
            .catch(error => {
                setErrorMessage('Error fetching user data:' + error);
            });
    }, [authorUsername]);

    useEffect(() => {
        fetchAuthorCourses();
        fetchAuthorMaps();
    }, [author]);

    if (!author) {
        return (<h1>Author is loading</h1>)
    }

    return (
        <Container maxWidth="lg" style={{
            marginTop: "30px",
            marginBottom: "40px"
        }}>
            <div className="author-header">
                <img className="author-image" alt="me" src={author.imageUrl ? 'http://' + window.location.hostname + `:8080/image/${author.imageUrl}` : '/default-icon.png'} />
                <Typography variant="h5" className="author-name">{author.firstName} {author.lastName}</Typography>
                <Typography variant="h6" className="author-profession">{author.type}</Typography>
                <Card elevation={5} style={{ width: "50%", background: "transparent", padding: "15px", margin: "10px auto", border: "1px solid rgba(255, 255, 255, 0.5)" }}>
                    <Typography variant="h8">{author.description}</Typography>
                </Card>
                {author.type === 'MENTOR' ? (
                    <Button startIcon={<HandshakeIcon />}
                        variant="contained"
                        color="material"
                        onClick={onHireMeClicked}
                        style={{
                            margin: "15px auto 25px auto"
                        }}>Hire me as a Mentor</Button>
                ) : (<></>)}
            </div>
            <div className="author-course-stats">
                <Grid container>
                    {author.type === 'MENTOR' ? (<Grid item xs={3} style={{
                        borderLeft: "2px solid white",
                        paddingLeft: "20px"
                    }}>
                        <Typography>Course Count</Typography>
                        <Typography variant="h4" style={{
                            marginTop: "20px",
                            color: "#EC6652",
                            fontWeight: "bold"
                        }}><CountUp start={0} end={authorCourses.length} duration={2} /></Typography>
                    </Grid>) : null}

                    <Grid item xs={author.type === 'MENTOR' ? 3 : 4} style={{
                        borderLeft: "2px solid white",
                        paddingLeft: "20px"
                    }}>
                        <Typography>Map Count</Typography>
                        <Typography variant="h4" style={{
                            marginTop: "20px",
                            color: "#EC6652",
                            fontWeight: "bold"
                        }}><CountUp start={0} end={authorMaps.length} duration={2} /></Typography>
                    </Grid>
                    <Grid item xs={author.type === 'MENTOR' ? 3 : 4} style={{
                        borderLeft: "2px solid white",
                        paddingLeft: "20px"
                    }}>
                        <Typography>Students</Typography>
                        <Typography variant="h4" style={{
                            marginTop: "20px",
                            color: "#EC6652",
                            fontWeight: "bold"
                        }}><CountUp start={0} end={0} duration={2} /></Typography>
                    </Grid>
                    <Grid item xs={author.type === 'MENTOR' ? 3 : 4} style={{
                        borderLeft: "2px solid white",
                        paddingLeft: "20px"
                    }}>
                        <Typography>Average Rating</Typography>
                        <Typography variant="h4" style={{
                            marginTop: "20px",
                            color: "#EC6652",
                            fontWeight: "bold"
                        }}><AnimatedRating contentRating={getContentRating()} /></Typography>
                    </Grid>
                </Grid>
            </div>
            {authorCourses.length > 0 ? (<div className="author-courses">
                <Typography variant="h5">Courses</Typography>
                <Grid container spacing={2} style={{
                    marginTop: "15px"
                }} alignItems="center">
                    {authorCourses.map(course => (
                        <Grid item xs={4}>
                            <ContentItem id={course.id}
                                type={'Course'}
                                title={course.title}
                                price={course.price}
                                imageSrc={"http://" + window.location.hostname + ":8080" + course.imageUrl}
                                authorImageSrc={course.author.imageUrl}
                                authorName={course.author.name}
                                authorUsername={course.author.username}></ContentItem>
                        </Grid>
                    ))}
                </Grid>
            </div>) : null}

            {authorMaps.length > 0 ? (<div className="author-courses">
                <Typography variant="h5">Maps</Typography>
                <Grid container spacing={2} style={{
                    marginTop: "15px"
                }} alignItems="center">
                    {authorMaps.map(map => (
                        <Grid item xs={4}>
                            <ContentItem id={map.mapId}
                                type={'Map'}
                                title={map.mapTitle}
                                imageSrc={"http://" + window.location.hostname + ":8080" + map.imagePath}
                                authorImageSrc={map.author.imageUrl}
                                authorName={map.author.name}
                                authorUsername={map.author.username}></ContentItem>
                        </Grid>
                    ))}
                </Grid>
            </div>) : null}

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