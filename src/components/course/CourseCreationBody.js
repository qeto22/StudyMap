import { Box, Button, Container, Divider, InputAdornment, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import ContentItem from "../welcome/ContentItem";
import FormTextInput from "../login/FormTextInput";
import { AuthContext } from "../AuthProvider";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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
            content = <div style={{ marginTop: "25px" }}>
                <div style={{ display: "flex", justifyContent: "right" }}>
                    <Button variant="outlined" color="material" style={{ marginLeft: "auto" }}>Add a Section</Button>
                </div>
                <Stack spacing={2}>
                    {/* Loop throught sections and create a dynamic sections */}
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