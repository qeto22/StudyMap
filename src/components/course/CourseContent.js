import Footer from "../footer/Footer";
import NavigationBar from "../navbar/NavigationBar";
import CourseBody from "./CourseBody";

function CourseContent() {
    return (
        <div>
            <NavigationBar />
            <CourseBody />
            <Footer />
        </div>
    )
}

export default CourseContent;