import React from "react";
import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function CourseSections({ showTitle }) {
    return (
        <div style={{ marginTop: "20px" }}>
            {showTitle ? (<Typography variant="h6" fontWeight={"bold"}>
                Course Content
            </Typography>) : (<></>)}

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
            </Accordion>
        </div>
    );
}

export default CourseSections;
