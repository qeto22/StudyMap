import { Box, Button, Container, Divider, InputAdornment, MenuItem, OutlinedInput, Select, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import ContentItem from "../welcome/ContentItem";
import FormTextInput from "../login/FormTextInput";
import { AuthContext } from "../AuthProvider";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CourseVideoUpload from "./CourseVideoUpload";
import { categories } from "../search/CategoriesList";

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
                <FormTextInput label={"Course Image"}
                    type={'file'}
                    onChange={handleImageChange}
                    accept={'image/*'}
                    style={{ marginTop: "10px" }}></FormTextInput>
                <FormTextInput style={{ marginTop: "10px" }} label={"Course Name"}
                    defaultValue={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)} />
                <div style={{ marginTop: "10px" }}>
                    <label style={{ fontSize: "14px", marginBottom: "5px" }}>Category</label>
                    <Select
                        size="small"
                        variant="outlined"
                        style={{
                            marginTop: "10px",
                            width: "100%"
                        }}
                        input={
                            <OutlinedInput
                                sx={{
                                    '&.MuiOutlinedInput-root': {
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgb(47, 129, 247)',
                                        },
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                        },
                                    },
                                }}
                            />
                        }
                    >
                        {/* Loop through categories and show menu item with icons on the left */}
                        {categories.map((category) => (
                            <MenuItem key={category.name} value={category.name}>
                                <div style={{ display: "flex", justifyContent: "left", alignItems: "center", gap: "15px" }}>
                                    {category.icon}
                                    <Typography style={{ fontSize: "14px" }}> {category.name} </Typography>
                                </div>
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <FormTextInput style={{ marginTop: "10px" }} label={"Price"}
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
            content = <CourseVideoUpload
                addSection={addSection}
                sections={sections}
                deleteSection={deleteSection}
                addVideo={addVideo}
                deleteVideo={deleteVideo}
                setSectionTitle={setSectionTitle}
                setVideoTitle={setVideoTitle}
                setVideoFile={setVideoFile} />
            break;
        case 2:
            content = <div>
                <FormTextInput label={"Course Description"} multiline={true} rows={4} />
                <FormTextInput label={"Course Tags (seperated by commas)"} style={{ marginTop: "15px" }} multiline={false} rows={1} />
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