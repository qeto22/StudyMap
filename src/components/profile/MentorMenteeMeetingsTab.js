import { Button, Alert, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import { AuthContext } from "../AuthProvider";
import Countdown from "react-countdown";
import { Navigate, useNavigate } from "react-router";
import { CollectionsBookmarkOutlined } from "@mui/icons-material";

function MentorMenteeMeetingsTab() {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [refreshed, setRefreshed] = useState(false);

    const [meetings, setMeetings] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setMeetings(null);
        setError(null);

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        };

        axios.get('http://' + window.location.hostname + ':8080/api/video/meetings', config)
            .then((response) => {
                setMeetings(response.data);
            })
            .catch(error => {
                setError("Error occurred while fetching meetings, Please refresh and try again!")
            });
    }, [refreshed]);

    const countdownRenderer = ({ days, hours, minutes, seconds, completed, props }) => {
        if (completed) {
            return props.children;
        } else {
            return <span>Starts in {days} days, {hours} hours, {minutes} minutes {seconds} seconds</span>;
        }
    };


    return (<div>
        <div style={{ width: "100%", display: 'flex', justifyContent: "end" }}>
            <Button variant="outlined" onClick={() => setRefreshed(!refreshed)}><RefreshIcon /></Button>
        </div>
        {error ? <div style={{ width: "100%", marginTop: "5px" }}>
            <Alert style={{ width: "60%", margin: "0 auto" }} variant="filled" severity="error">{error}</Alert>
        </div> : null}

        {meetings != null && meetings.length === 0 && error === null ? <div style={{ width: "100%", marginTop: "5px" }}>
            <Alert style={{ width: "60%", margin: "0 auto", color: "white" }} variant="filled" severity="info">No meetings to show!</Alert>
        </div> : null}

        {meetings != null && meetings.length >= 0 && error === null ? (
            <Grid container spacing={2}>
                {meetings.map((meeting) => (
                    <Grid item md={6} style={{ width: "100%", marginTop: "15px" }}>
                        <div style={{
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                            backgroundColor: "#121212",
                            borderRadius: "6px",
                            padding: "15px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "100px"
                        }}>
                            <div>
                                <Typography style={{ textAlign: "center", fontSize: "17px" }}>Meeting with {user.type === 'MENTOR' ? meeting.mentee.name : meeting.mentor.name}</Typography>
                                <Typography style={{ textAlign: "center", fontSize: "14px", marginTop: "8px", color: "rgba(255, 255, 255, 0.5)" }}>
                                    <Countdown key={meeting} date={meeting.date} renderer={countdownRenderer}>
                                        <Button style={{ 
                                            marginTop: "8px",
                                            color: "white"
                                         }} color="material" variant="contained" onClick={() => {
                                            navigate(`/call/${meeting.id}`)
                                        }}>Join the Meeting!</Button>
                                    </Countdown>
                                </Typography>
                            </div>
                        </div>
                    </Grid>))}
            </Grid>) : null}
    </div>);
}

export default MentorMenteeMeetingsTab;