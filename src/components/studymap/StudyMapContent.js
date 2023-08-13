import Footer from "../footer/Footer";
import NavigationBar from "../navbar/NavigationBar";
import StudyMapBody from "./StudyMapBody";

function StudyMapContent() {
    return (
        <div>
            <NavigationBar />
            <StudyMapBody></StudyMapBody>
            <Footer />
        </div>
    )
}

export default StudyMapContent;