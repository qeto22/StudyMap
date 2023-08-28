import { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import NavigationBar from "../navbar/NavigationBar";
import CourseBody from "./CourseBody";
import axios from "axios";
import { Alert, Container } from "@mui/material";

function CourseContent() {
    const [course, setCourse] = useState(null);
    const [courseFetchignError, setCourseFetchingError] = useState(null);

    useEffect(() => {
        if (course !== null) return;

        const courseId = window.location.pathname.split("/")[2];

        axios.get('http://' + window.location.hostname + `:8080/api/v1/course/${courseId}`)
            .then(res => {
                setCourse(res.data);
            }).catch((err) => {
                setCourseFetchingError('Course does not exist or could not be fetched!');
            });

    }, [course]);

    useEffect(() => {
        if (course !== null) {
            console.log(course);
            document.title = course.title + " | Course - StudyMap";
        }
    }, [course]);

    return (
        <div>
            <NavigationBar />
            {courseFetchignError ? (
                <Container maxWidth="sm" style={{ marginTop: "50px", marginBottom: "50px" }}>
                    <Alert style={{
                        marginBottom: "10px",
                        fontSize: "14px"
                    }} variant="filled" severity="error" open>{courseFetchignError}</Alert>
                </Container>)
                : <CourseBody course={course} />}
            <Footer />
        </div>
    )
}

export default CourseContent;