import React, { useState } from 'react';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import "video-react/dist/video-react.css";
import { BigPlayButton, ControlBar, PlaybackRateMenuButton, Player } from 'video-react';
import './WatchCourseContent.css';
import CourseContentDrawer from './CourseContentDrawer';

function WatchCourseContent() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        setIsDrawerOpen(open);
    };

    const playerWidth = isDrawerOpen ? "75%" : "100%";

    return (
        <div style={{ width: "100vw", height: "100vh", background: "red" }}>

            <div style={{ width: playerWidth, height: "100%", transition: 'width 0.3s', overflow: 'hidden' }}>
                <Player
                    fluid={false}
                    width="100%"
                    height="100%"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
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

            <CourseContentDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}></CourseContentDrawer>
        </div>
    );
}

export default WatchCourseContent;
