import * as React from 'react';
import { Container } from "@mui/material";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormTextInput from '../login/FormTextInput';
import StudyMapVisualisationCreation from './StudyMapVisualisationCreation';

const steps = ['StudyMap Name', 'StudyMap Visualisation', 'StudyMap Description'];

function StudyMapCreationBody() {
    const [activeStep, setActiveStep] = React.useState(0);

    const [mapTitle, setMapTitle] = React.useState('');
    const [nodeData, setNodeData] = React.useState([]);
    const [mapDescription, setMapDescription] = React.useState('');

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    let content;
    switch (activeStep) {
        case 0:
            content = <div style={{ width: "60%", margin: "0 auto" }}>
                <FormTextInput label={"StudyMap Name"} defaultValue={mapTitle} onChange={(e) => setMapTitle(e.target.value)} />
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
        default:
            content = null;
            break;
    }

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
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
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