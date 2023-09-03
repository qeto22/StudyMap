import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import "video-react/dist/video-react.css";
import { BigPlayButton, ControlBar, PlaybackRateMenuButton, Player } from 'video-react';
import './WatchCourseContent.css';
import CourseContentDrawer from './CourseContentDrawer';
import axios from 'axios';

function WatchCourseContent() {
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [videoSource, setVideoSource] = useState(null);

    const onVideoSelected = (video) => {
        setVideoSource(video.videoUrl);
    }

    const toggleDrawer = (open) => (event) => {
        setIsDrawerOpen(open);
    };

    const playerWidth = isDrawerOpen ? "75vw" : "100vw";

    useEffect(() => {
        if (course !== null) return;

        const courseId = window.location.pathname.split("/")[2];

        axios.get('http://' + window.location.hostname + `:8080/api/v1/course/${courseId}`)
            .then(res => {
                console.log(res.data);
                setCourse(res.data);
            }).catch((err) => {
                setError('Course does not exist or you don\'t have permission to see it!');
            });
    }, [course]);

    if (course == null && error == null) {
        return (
            <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <CircularProgress color='material' />
                    <Typography variant="h6" style={{ marginTop: "10px" }}>Loading course...</Typography>
                </div>
            </div>
        )
    }

    if (error != null) {
        return (
            <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <Typography variant="h6" style={{ marginTop: "10px" }}>{error}</Typography>
                </div>
            </div>
        )
    }

    return (
        <div style={{ width: "100vw", height: "100vh" }}>

            <div style={{ width: playerWidth, height: "100%", transition: 'width 0.3s', overflow: 'hidden' }}>
                <Player
                    fluid={false}
                    width="100%"
                    height="100%"
                    src={'http://' + window.location.hostname + ':8080' + (videoSource == null ? course.sections[0].videos[0].videoUrl : videoSource)}
                >
                    <BigPlayButton position="center" />
                    <ControlBar height="100px">
                        <PlaybackRateMenuButton rates={[2, 1.5, 1, 0.5]} order={2} />
                    </ControlBar>
                </Player>
            </div>

            <Button
                edge="end"
                color="material"
                variant="contained"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                style={{
                    position: 'absolute',
                    top: '30px',
                    right: '50px',
                }}
            >
                <MenuIcon />
            </Button>

            <CourseContentDrawer course={course}
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
                onVideoSelected={onVideoSelected} />
        </div>
    );
}

export default WatchCourseContent;
