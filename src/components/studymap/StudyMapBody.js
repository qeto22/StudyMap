import { Container, Typography } from '@mui/material';
import StudyMapDescription from './StudyMapDescription';
import Author from './Author';
import StudyMapVisualisation from './StudyMapVisualisation';
import Reviews from './Reviews';

const StudyMapBody = () => {
    return (
        <Container maxWidth="lg">
            <Typography style={{
                textAlign: 'center',
                marginTop: '40px',
                marginBottom: '40px',
                fontSize: '28px',
                fontFamily: 'cubano'
            }}>How to become Javascript Hero </Typography>
            <StudyMapVisualisation></StudyMapVisualisation>
            <StudyMapDescription></StudyMapDescription>
            <Author></Author>
            <Reviews></Reviews>
        </Container>
    );
};

export default StudyMapBody;
