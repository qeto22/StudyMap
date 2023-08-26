import React from "react";
import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import VideoFileIcon from '@mui/icons-material/VideoFile';

function CourseSections({ sections, showTitle }) {
    console.log(sections);
    return (
        <div style={{ marginTop: "20px" }}>
            {showTitle ? (<Typography variant="h6" fontWeight={"bold"}>
                Course Content
            </Typography>) : (<></>)}

            {sections.map((section, index) => {
                return (
                    <Accordion style={{ marginTop: "20px" }} disableGutters>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                <div style={{ display: "flex", gap: "8px" }}>
                                    <VideoLibraryIcon></VideoLibraryIcon>
                                    <Typography>{section.title}</Typography>
                                </div>
                                <Typography style={{ fontSize: "14px", marginRight: "8px" }} color="textSecondary">{section.videos.length} Videos</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {section.videos.map((video, index) => {
                                    return (
                                        <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                                            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                                <VideoFileIcon fontSize={"17px"}></VideoFileIcon>
                                                <Typography fontSize={"15px"}>{video.title}</Typography>
                                            </div>
                                            <Typography fontSize={"13px"} style={{ color: "rgba(255, 255, 255, 0.6)", alignSelf: "right" }} >15:00</Typography>
                                        </div>
                                    )
                                })}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
            {/* 
            <Accordion style={{ marginTop: "20px" }} disableGutters>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                        <Typography>Chapter 1: Hello Javascript</Typography>
                        <Typography style={{ fontSize: "14px", marginRight: "8px" }} color="textSecondary">5 Videos • 4 hours</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Details about the course content.
                    </Typography>
                </AccordionDetails>
            </Accordion>


            <Accordion disableGutters>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                        <Typography>Chapter 2: Storing Information in Variable</Typography>
                        <Typography style={{ fontSize: "14px", marginRight: "8px" }} color="textSecondary">3 Videos • 6 hours</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Details about the course content.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion disableGutters>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                        <Typography>Chapter 3: Conditional Statement</Typography>
                        <Typography style={{ fontSize: "14px", marginRight: "8px" }} color="textSecondary">2 Videos • 3 hours</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Details about the course content.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion disableGutters>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                        <Typography>Chapter 4: Dialog Boxes</Typography>
                        <Typography style={{ fontSize: "14px", marginRight: "8px" }} color="textSecondary">5 Videos • 7 hours</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Details about the course content.
                    </Typography>
                </AccordionDetails>
            </Accordion> */}
        </div>
    );
}

export default CourseSections;
