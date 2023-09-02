import { Alert, Grid, Snackbar } from "@mui/material";
import ContentItem from "../welcome/ContentItem";
import AddGridItem from "./AddGridItem";
import { useNavigate } from "react-router-dom";
import LoadingContentItem from "./LoadingContentItem";
import { useEffect, useState } from "react";
import axios from "axios";

function CourseGrid() {
    const navigate = useNavigate();

    const [courses, setCourses] = useState(null);
    const [courseFetchingError, setCourseFetchingError] = useState(null);

    useEffect(() => {
        if (courses) {
            return;
        }
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.get("http://" + window.location.hostname + ":8080/api/v1/course/", config)
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                setCourseFetchingError(error);
                setCourses([]);
            });
    }, [courses]);

    return (
        <Grid container>
            {courses ? (courses.map((item, index) => (
                <Grid item md={4} style={{ padding: "0 10px" }}>
                    <ContentItem id={item.id}
                        type={'Course'}
                        title={item.title}
                        imageSrc={"http://" + window.location.hostname + ":8080" + item.imageUrl}
                        price={item.price}
                        authorName={item.author.name}
                        authorUsername={item.author.username}>
                    </ContentItem>
                </Grid>
            ))) : <></>}
            {courses === null ? <Grid item md={4} style={{ padding: "0 10px" }}>
                <LoadingContentItem />
            </Grid> : <></>}

            <Snackbar open={courseFetchingError !== null} autoHideDuration={5000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert severity="error" variant="contained" style={{ width: "100%", background: "#D84646" }}>
                    Could not fetch Courses! Please refresh the page or try again later
                </Alert>
            </Snackbar>

            <Grid item md={4} style={{ padding: "0 10px" }}>
                <AddGridItem label={'Upload New Course'} onClick={() => navigate('/course/create')} />
            </Grid>
        </Grid>
    )
}

export default CourseGrid;