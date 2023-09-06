import { Alert, Box, Button, Container, Divider, InputAdornment, LinearProgress, MenuItem, OutlinedInput, Select, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ContentItem from "../welcome/ContentItem";
import FormTextInput from "../login/FormTextInput";
import { AuthContext } from "../AuthProvider";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CourseVideoUpload from "./CourseVideoUpload";
import { categories } from "../search/CategoriesList";
import axios from "axios";
import { OpenInNew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const steps = ['Course Title, Image & Price', 'Course Sections & Videos', 'Course Description & Tags'];

function CourseCreationBody() {
    const { user } = React.useContext(AuthContext);
    const userName = user === null ? '' : (user.firstName.concat(' ').concat(user.lastName));

    const navigate = useNavigate();

    const [activeStep, setActiveStep] = React.useState(0);

    const [imageFile, setImageFile] = React.useState(null);
    const [courseTitle, setCourseTitle] = React.useState('');
    const [courseCategory, setCourseCategory] = React.useState(null);
    const [coursePrice, setCoursePrice] = React.useState(null);
    const [courseSections, setCourseSections] = React.useState([]);
    const [courseDescription, setCourseDescription] = React.useState('');
    const [courseLearningObjectives, setCourseLearningObjectives] = React.useState('');
    const [courseTags, setCourseTags] = React.useState('');

    const [courseId, setCourseId] = React.useState(null);
    const [uploadedCourseSections, setUploadedCourseSections] = React.useState([]);
    const [courseUploadError, setCourseUploadError] = React.useState(null);
    
    console.log("Keto Bachala");
    console.log(uploadedCourseSections);
    console.log(courseSections);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

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
        setCourseSections([...courseSections, newSection]);
    }

    const addVideo = (sectionIndex) => {
        const newSections = [...courseSections];
        newSections[sectionIndex].videos.push({
            title: '',
            url: ''
        });
        setCourseSections(newSections);
    }

    const deleteSection = (index) => {
        setCourseSections(courseSections.filter((item, i) => i !== index));
    }

    const deleteVideo = (sectionIndex, videoIndex) => {
        const newSections = [...courseSections];
        newSections[sectionIndex].videos = newSections[sectionIndex].videos.filter((item, i) => i !== videoIndex);
        setCourseSections(newSections);
    }

    const setSectionTitle = (index, title) => {
        const newSections = [...courseSections];
        newSections[index].title = title;
        setCourseSections(newSections);
    }

    const setVideoTitle = (sectionIndex, videoIndex, title) => {
        const newSections = [...courseSections];
        newSections[sectionIndex].videos[videoIndex].title = title;
        setCourseSections(newSections);
    }

    const setVideoFile = (sectionIndex, videoIndex, url) => {
        const newSections = [...courseSections];
        newSections[sectionIndex].videos[videoIndex].url = url;
        setCourseSections(newSections);
    }

    const uploadCourse = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        const formData = new FormData();
        formData.append("request", new Blob([JSON.stringify({
            courseTitle,
            courseCategory,
            coursePrice,
            courseDescription,
            courseTags,
            courseLearningObjectives
        })], { type: 'application/json' }));
        formData.append("image", imageFile, imageFile.name);

        try {
            const response = await axios.post('http://' + window.location.hostname + ':8080/api/v1/course/create', formData, config);
            if (response.status === 200) {
                setCourseId(response.data.id);
            } else {
                setCourseUploadError('Error occurred uploading Course Details!');
            }
        } catch (ex) {
            setCourseUploadError('Error occurred uploading Course Details!');
        }
    }

    const uploadCourseSection = async (section) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };
        
        const formData = new FormData();
        formData.append("request", new Blob([JSON.stringify({
            courseId,
            sectionTitle: section.title,
            videoTitles: section.videos.map((video) => video.title)
        })], { type: 'application/json' }));

        for (let i = 0; i < section.videos.length; i++) {
            const video = section.videos[i];
            formData.append("videos", video.url, video.url.name);
        }

        try {
            const response = await axios.post('http://' + window.location.hostname + ':8080/api/v1/course/section', formData, config);
            if (response.status !== 200) {
                setCourseUploadError(`Error occurred uploading Section ${section.title}!`);
            } else {
                setUploadedCourseSections(prevStateOfUploadedCourses => [...prevStateOfUploadedCourses, section]);
            }
        } catch (ex) {
            setCourseUploadError(`Error occurred uploading Section ${section.title}!`);
        }
    }

    useEffect(() => {
        if (courseId === null) {
            return;
        }

        const sectionsToUpload = courseSections.filter((section, index) => !uploadedCourseSections.includes(section))
        
        for (let i = 0; i < sectionsToUpload.length; i++) {
            const section = sectionsToUpload[i];
            if (courseUploadError) {
                break;
            }
            uploadCourseSection(section);
        }
    }, [courseId]);


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
                        value={courseCategory}
                        onChange={(e) => setCourseCategory(e.target.value)}
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
                sections={courseSections}
                deleteSection={deleteSection}
                addVideo={addVideo}
                deleteVideo={deleteVideo}
                setSectionTitle={setSectionTitle}
                setVideoTitle={setVideoTitle}
                setVideoFile={setVideoFile} />
            break;
        case 2:
            content = <div>
                <FormTextInput defaultValue={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} label={"Course Description"} multiline={true} rows={4} />
                <FormTextInput defaultValue={courseLearningObjectives} onChange={(e) => setCourseLearningObjectives(e.target.value)} label={"What you'll learn"} multiline={true} rows={4} style={{ marginTop: "10px" }} />
                <FormTextInput defaultValue={courseTags} onChange={(e) => setCourseTags(e.target.value)} label={"Course Tags (seperated by commas)"} style={{ marginTop: "10px" }} multiline={false} rows={1} />
            </div>;
            break;
        case 3:
            handleNext()
            uploadCourse();
            break;
        default:
            content = null;
            break;
    }

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
            {activeStep >= steps.length ? (
                <React.Fragment>
                    {courseId && uploadedCourseSections.length === courseSections.length ? (
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <Button color='success' variant='contained'
                                onClick={() => { navigate(`/course/${courseId}`) }}
                                style={{ margin: "40px", color: "white" }}>
                                <OpenInNew fontSize='small' /> &nbsp;&nbsp; View Course Page
                            </Button>
                        </div>
                    ) : (<></>)}

                    {courseUploadError ? (
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "30px auto" }}>
                            <Alert severity="error" style={{ background: "rgb(211, 47, 47)" }} variant="contained">{courseUploadError}</Alert>
                        </div>
                    ) : (<></>)}

                    {!courseId ? (
                        <div style={{ width: "80%", margin: "0 auto" }}>
                            <Typography style={{ fontSize: "16px", textAlign: "center", marginTop: "40px" }}>Uploading Course Data</Typography>
                            <LinearProgress color="material" sx={{ mt: "15px" }} />
                        </div>
                    ) : (<></>)}

                    {courseId && uploadedCourseSections.length !== courseSections.length ? (
                        <div style={{ width: "80%", margin: "0 auto" }}>
                            <Typography style={{ fontSize: "16px", textAlign: "center", marginTop: "40px" }}>Uploading Videos</Typography>
                            <LinearProgress color="material" value={(uploadedCourseSections.length / courseSections.length) * 100} sx={{ mt: "15px" }} />
                        </div>
                    ) : (<></>)}

                </React.Fragment>
            ) : (
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
                </React.Fragment>)}
        </Box>
    </Container>);
}

export default CourseCreationBody;