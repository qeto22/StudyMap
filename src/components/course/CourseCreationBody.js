import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Divider, IconButton, InputAdornment, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import ContentItem from "../welcome/ContentItem";
import FormTextInput from "../login/FormTextInput";
import { AuthContext } from "../AuthProvider";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Delete, ExpandMore } from "@mui/icons-material";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import VideoFileIcon from '@mui/icons-material/VideoFile';

const steps = ['Course Title, Image & Price', 'Course Sections & Videos', 'Course Description & Tags'];

function CourseCreationBody() {
    const { user } = React.useContext(AuthContext);
    const userName = user === null ? '' : (user.firstName.concat(' ').concat(user.lastName));

    const [activeStep, setActiveStep] = React.useState(0);

    const [courseTitle, setCourseTitle] = React.useState('');
    const [imageFile, setImageFile] = React.useState(null);
    const [coursePrice, setCoursePrice] = React.useState(null);
    const [sections, setSections] = React.useState([]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const addSection = () => {
        const newSection = {
            title: '',
            videos: []
        }
        setSections([...sections, newSection]);
    }

    const addVideo = (sectionIndex) => {
        const newSections = [...sections];
        newSections[sectionIndex].videos.push({
            title: '',
            url: ''
        });
        setSections(newSections);
    }

    const deleteSection = (index) => {
        setSections(sections.filter((item, i) => i !== index));
    }

    const deleteVideo = (sectionIndex, videoIndex) => {
        const newSections = [...sections];
        newSections[sectionIndex].videos = newSections[sectionIndex].videos.filter((item, i) => i !== videoIndex);
        setSections(newSections);
    }

    const setSectionTitle = (index, title) => {
        const newSections = [...sections];
        newSections[index].title = title;
        setSections(newSections);
    }

    const setVideoTitle = (sectionIndex, videoIndex, title) => {
        const newSections = [...sections];
        newSections[sectionIndex].videos[videoIndex].title = title;
        setSections(newSections);
    }

    const setVideoFile = (sectionIndex, videoIndex, url) => {
        const newSections = [...sections];
        newSections[sectionIndex].videos[videoIndex].url = url;
        setSections(newSections);
    }

    let content;
    switch (activeStep) {
        case 0:
            content = <div style={{ width: "60%", margin: "15px auto" }}>
                <Typography align='center'>Preview</Typography>
                <div style={{ width: "300px", margin: "15px auto" }}>
                    <ContentItem id={1}
                        type={'Course'}
                        hideOverview={true}
                        title={courseTitle}
                        imageSrc={imageFile ? URL.createObjectURL(imageFile) : ''}
                        authorName={userName}
                        price={coursePrice}>

                    </ContentItem>
                </div>

                <Divider></Divider>
                <FormTextInput label={"StudyMap Image"}
                    type={'file'}
                    onChange={handleImageChange}
                    accept={'image/*'}
                    style={{ marginBottom: "10px" }}></FormTextInput>
                <FormTextInput label={"StudyMap Name"}
                    defaultValue={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)} />
                <FormTextInput label={"Price"}
                    type={'number'}
                    defaultValue={coursePrice}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AttachMoneyIcon />
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => setCoursePrice(e.target.value)} />
            </div>;
            break;
        case 1:
            // Todo: Move this as a component
            content = <div style={{ marginTop: "25px" }}>
                <div style={{ display: "flex", justifyContent: "right" }}>
                    <Button variant="outlined" color="material" style={{ marginLeft: "auto" }} onClick={addSection}>Add a Section</Button>
                </div>
                <Stack spacing={2} style={{ marginTop: "15px" }}>
                    {sections.map((item, index) => (
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                            >
                                <VideoLibraryIcon size="small" style={{ marginRight: "8px", alignSelf: "center" }} />
                                <Typography style={{ flexGrow: 1, alignSelf: "center", color: item.title === '' ? 'rgba(255, 255, 255, 0.5)' : 'white' }}>{item.title === '' ? 'Please enter section title' : item.title}</Typography>
                                <IconButton
                                    color="material"
                                    aria-label="delete section"
                                    component="span"
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent accordion from expanding/collapsing when deleting
                                        deleteSection(index);
                                    }}
                                >
                                    <Delete />
                                </IconButton>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormTextInput label={"Section Title"} onChange={(e) => setSectionTitle(index, e.target.value)}></FormTextInput>
                                <label style={{ fontSize: "14px", display: "inline-block", marginTop: "15px" }}>Videos</label>
                                <div style={{ display: "flex", justifyContent: "right" }}>
                                    <Button variant="outlined" color="success" style={{ marginLeft: "auto" }} size="small" onClick={() => addVideo(index)}>Add a Video</Button>
                                </div>
                                {item.videos.map((video, videoIndex) => (
                                    // Todo: make this accordion smaller
                                    <Accordion size="small" key={`${index}.${videoIndex}`} style={{
                                        marginTop: "10px",
                                        border: "1px solid rgba(255, 255, 255, 0.3)",
                                        borderRadius: "6px"
                                    }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                        >
                                            <VideoFileIcon size="small" style={{ marginRight: "8px", alignSelf: "center" }} />
                                            <Typography style={{ flexGrow: 1, alignSelf: "center", color: video.title === '' ? 'rgba(255, 255, 255, 0.5)' : 'white' }}>{video.title === '' ? 'Please enter video title' : video.title}</Typography>
                                            <IconButton
                                                color="material"
                                                aria-label="delete section"
                                                component="span"
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteVideo(index, videoIndex);
                                                }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <FormTextInput label={"Video Title"}
                                                onChange={(event) => setVideoTitle(index, videoIndex, event.target.value)}></FormTextInput>
                                            <FormTextInput label={"Video File (Supports MP4, AVI, MKV, MOV...)"}
                                                type={'file'}
                                                style={{ marginTop: "10px" }}
                                                onChange={(event) => setVideoFile(index, videoIndex, event.target.value)}></FormTextInput>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Stack>
            </div>
            break;
        case 2:
            content = <div>
                <h1>Third Step</h1>
            </div>;
            break;
        default:
            content = null;
            break;
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (<Container maxWidth="md">
        <Box sx={{ width: '100%', marginTop: "40px", marginBottom: "40px" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                    const stepProps = {};
                    const labelProps = {};

                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <React.Fragment>
                <div style={{ margin: "15px auto" }}>
                    {content}
                </div>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="material"
                        variant="contained"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1, width: "100px" }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />

                    <Button onClick={handleNext} color="material" variant="contained" style={{ width: "100px" }}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
            </React.Fragment>
        </Box>
    </Container>);
}

export default CourseCreationBody;