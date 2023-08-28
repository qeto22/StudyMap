import { useEffect } from "react";
import Footer from "../footer/Footer";
import NavigationBar from "../navbar/NavigationBar";
import WelcomeBody from "./WelcomeBody";


function WelcomeContent() {
    useEffect(() => {
        document.title = "StudyMap - Roadmap to your Success!";
    });
    return (
        <div>
            <NavigationBar />
            <WelcomeBody />
            <Footer />
        </div>
    )
}

export default WelcomeContent;