import { Alert, Grid, Snackbar } from "@mui/material";
import AddGridItem from "./AddGridItem";
import ContentItem from "../welcome/ContentItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingContentItem from "./LoadingContentItem";

function StudyMapsGrid() {
    const navigate = useNavigate();

    const [ownStudyMaps, setOwnStudyMaps] = useState(null);
    const [ownStudyMapsError, setOwnStudyMapsError] = useState(null);

    useEffect(() => {
        if (ownStudyMaps) {
            return;
        }
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.get("http://" + window.location.hostname + ":8080/api/v1/map/own-maps", config)
            .then((response) => {
                setOwnStudyMaps(response.data);
            })
            .catch((error) => {
                setOwnStudyMapsError(error);
                setOwnStudyMaps([]);
            });
    }, [ownStudyMaps]);

    const onSnackbarTimedOut = () => {
        setOwnStudyMapsError(null);
    }

    return (
        <Grid container>

            {ownStudyMaps ? (ownStudyMaps.map((item, index) => (
                <Grid item md={4} style={{ padding: "0 10px" }}>
                    <ContentItem id={item.mapId}
                        type={'Map'}
                        title={item.mapTitle}
                        imageSrc={"http://" + window.location.hostname + ":8080" + item.imagePath}
                        authorName={item.author.name}></ContentItem>
                </Grid>
            ))) : <></>}

            {ownStudyMaps === null ? <Grid item md={4} style={{ padding: "0 10px" }}>
               <LoadingContentItem />
            </Grid> : <></>}

            <Snackbar open={ownStudyMapsError !== null} autoHideDuration={5000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={onSnackbarTimedOut}>
                <Alert severity="error" variant="contained" style={{ width: "100%", background: "#D84646" }}>
                    Could not fetch StudyMaps created by you! Please refresh the page or try again later
                </Alert>
            </Snackbar>

            <Grid item md={4} style={{ padding: "0 10px" }}>
                <AddGridItem label={"Add StudyMap"} onClick={() => navigate('/map/create')} />
            </Grid>
        </Grid>
    )
}

export default StudyMapsGrid;
