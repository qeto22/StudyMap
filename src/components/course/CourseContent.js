import { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import NavigationBar from "../navbar/NavigationBar";
import CourseBody from "./CourseBody";
import axios from "axios";
import { Alert, Container } from "@mui/material";

function CourseContent() {
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (course !== null) return;

        const courseId = window.location.pathname.split("/")[2];

        axios.get('http://' + window.location.hostname + `:8080/api/v1/course/${courseId}`)
            .then(res => {
                setCourse(res.data);
            }).catch((err) => {
                setError('Course does not exist or could not be fetched!');
            });

    }, [course]);

    useEffect(() => {
        if (course !== null) {
            document.title = course.title + " | Course - StudyMap";
        }
    }, [course]);

    const onReviewSubmit = (review) => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.post("http://" + window.location.hostname + ":8080/api/v1/course/" + window.location.pathname.split("/")[2] + "/review", review, config)
            .then((response) => {
                if (response.status !== 200) {
                    setError("Error occurred posting the review. Please refresh the page and try again!");
                    return;
                }
                
                setCourse((prevState) => {
                    return {
                        ...prevState,
                        reviews: [...prevState.reviews, response.data]
                    }
                });
            })
            .catch((error) => {
                setError("Error occurred posting the review. Please refresh the page and try again!");
            });
    }

    return (
        <div>
            <NavigationBar />
            {error ? (
                <Container maxWidth="sm" style={{ marginTop: "50px", marginBottom: "50px" }}>
                    <Alert style={{
                        marginBottom: "10px",
                        fontSize: "14px"
                    }} variant="filled" severity="error" open>{error}</Alert>
                </Container>)
                : <CourseBody course={course} onReviewSubmit={onReviewSubmit} />}
            <Footer />
        </div>
    )
}

export default CourseContent;