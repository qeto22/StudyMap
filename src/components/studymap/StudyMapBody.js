import { Alert, Container, Skeleton, Typography } from '@mui/material';
import StudyMapDescription from './StudyMapDescription';
import Author from './Author';
import StudyMapVisualisation from './StudyMapVisualisation';
import Reviews from './Reviews';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudyMapBody = () => {
    const params = useParams()

    const [studyMap, setStudyMap] = useState(null);
    const [studyMapError, setStudyMapError] = useState(null);

    useEffect(() => {
        if (studyMap) {
            return;
        }

        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.get("http://" + window.location.hostname + ":8080/api/v1/map/" + params.mapId, config)
            .then((response) => {
                if (response.status !== 200) {
                    setStudyMapError("StudyMap does not exists or you do not have permission to view it.");
                    return;
                }
                setStudyMap(response.data);
            })
            .catch((error) => {
                setStudyMapError("StudyMap does not exists or you do not have permission to view it.");
            });
    }, [studyMap, params.mapId]);

    if (studyMapError !== null) {
        return (<Container maxWidth="lg">
            <Alert style={{ margin: "50px auto" }} variant="filled" severity="error">{studyMapError}</Alert>
        </Container>)
    }

    if (studyMap === null) {
        return (<Container maxWidth="lg">
            <Skeleton height={60} style={{ marginTop: "40px", marginLeft: "auto", marginRight: "auto" }}></Skeleton>
            <div style={{ margin: "0 auto", marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
                <Skeleton width={120} height={45}></Skeleton>
                <Skeleton width={120} height={45}></Skeleton>
                <Skeleton width={120} height={45}></Skeleton>
            </div>
            <Skeleton height={450}></Skeleton>
        </Container>)
    }
    
    return (
        <Container maxWidth="lg">
            <Typography style={{
                textAlign: 'center',
                marginTop: '40px',
                marginBottom: '40px',
                fontSize: '28px',
                fontFamily: 'cubano'
            }}>{studyMap.mapTitle}</Typography>
            <StudyMapVisualisation studyMapData={studyMap.nodeData}></StudyMapVisualisation>
            <StudyMapDescription description={studyMap.mapDescription}></StudyMapDescription>
            <Author author={studyMap.author}></Author>
            <Reviews></Reviews>
        </Container>
    );
};

export default StudyMapBody;
