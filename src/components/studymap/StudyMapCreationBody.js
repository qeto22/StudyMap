import * as React from 'react';
import { Alert, Container, Divider, LinearProgress, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FormTextInput from '../login/FormTextInput';
import StudyMapVisualisationCreation from './StudyMapVisualisationCreation';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Typed from 'typed.js';
import ContentItem from '../welcome/ContentItem';
import { AuthContext } from '../AuthProvider';

const steps = ['StudyMap Name', 'StudyMap Visualisation', 'StudyMap Description'];

function StudyMapCreationBody() {
    const { user } = React.useContext(AuthContext);
    const userName = user === null ? '' : (user.firstName.concat(' ').concat(user.lastName));

    const navigate = useNavigate();

    const [mapUrl, setMapUrl] = React.useState(null);
    const [uploadErrorMessage, setUploadErrorMessage] = React.useState(null);

    const [activeStep, setActiveStep] = React.useState(0);

    const typedRef = React.useRef(null);

    const [imageFile, setImageFile] = React.useState(null);
    const [mapTitle, setMapTitle] = React.useState('');
    const [nodeData, setNodeData] = React.useState([]);
    const [mapDescription, setMapDescription] = React.useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const uploadStudyMap = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        const formData = new FormData();
        formData.append("request", new Blob([JSON.stringify({
            mapTitle,
            nodeData,
            mapDescription
        })], { type: 'application/json' }));
        formData.append("image", imageFile, imageFile.name);

        try {
            const response = await axios.post('http://' + window.location.hostname + ':8080/api/v1/map/create', formData, config);

            if (response.status === 200) {
                setMapUrl(`/map/${response.data.id}`);
            } else {
                setUploadErrorMessage('Error occurred uploading StudyMap!');
            }
        } catch (ex) {
            setUploadErrorMessage('Error occurred uploading StudyMap!');
        }


    }

    let content;
    switch (activeStep) {
        case 0:
            content = <div style={{ width: "60%", margin: "15px auto" }}>
                <Typography align='center'>Preview</Typography>
                <div style={{ width: "300px", margin: "15px auto" }}>
                    <ContentItem id={1}
                        type={'Map'}
                        hideOverview={true}
                        title={mapTitle}
                        imageSrc={imageFile ? URL.createObjectURL(imageFile) : ''}
                        authorName={userName}>

                    </ContentItem>
                </div>

                <Divider></Divider>
                <FormTextInput label={"StudyMap Image"}
                    type={'file'}
                    onChange={handleImageChange}
                    accept={'image/*'}
                    style={{ marginBottom: "10px" }}></FormTextInput>
                <FormTextInput label={"StudyMap Name"}
                    defaultValue={mapTitle}
                    onChange={(e) => setMapTitle(e.target.value)} />
            </div>;
            break;
        case 1:
            content = <div>
                <StudyMapVisualisationCreation nodeData={nodeData} setNodeData={setNodeData} />
            </div>
            break;
        case 2:
            content = <div style={{ width: "60%", margin: "0 auto" }}>
                <FormTextInput label={"Description"} multiline={true} fieldStyle={{ minHeight: "100px !important" }} defaultValue={mapDescription}
                    onChange={(e) => setMapDescription(e.target.value)} />
            </div>
            break;
        case 3:
            handleNext()
            uploadStudyMap();
            break;
        default:
            content = null;
            break;
    }

    React.useEffect(() => {
        if (activeStep !== steps.length) {
            return;
        }

        const options = {
            strings: ['Uploading the StudyMap...', 'Please do not close the window!', 'Still Working on it...', 'Little bit more'],
            typeSpeed: 50,
            backSpeed: 75,
            backDelay: 300,
            loop: true,
            parse: true
        }

        // Create a new instance of Typed.js
        typedRef.current = new Typed('.typed-text', options);

        return () => {
            typedRef.current.destroy();
        };
    }, [activeStep]);

    return (
        <Container maxWidth="md">
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

                        {mapUrl ? (
                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <Button color='success' variant='contained'
                                    onClick={() => { navigate(mapUrl) }}
                                    style={{ margin: "40px", color: "white" }}>
                                    <OpenInNewIcon fontSize='small' /> &nbsp;&nbsp; View StudyMap
                                </Button>
                            </div>
                        ) : (<></>)}

                        {uploadErrorMessage ? (
                            <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "30px auto" }}>
                                <Alert severity="error" style={{ background: "rgb(211, 47, 47)" }} variant="contained">{uploadErrorMessage}</Alert>
                            </div>
                        ) : (<></>)}

                        {!mapUrl && !uploadErrorMessage ? (
                            <div style={{ width: "80%", margin: "0 auto" }}>
                                <Typography style={{ fontSize: "16px", textAlign: "center", marginTop: "40px" }}><span className='typed-text'></span></Typography>
                                <LinearProgress color="material" sx={{ mt: "15px" }} />
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
                    </React.Fragment>
                )}
            </Box>
        </Container>
    );
}

export default StudyMapCreationBody;