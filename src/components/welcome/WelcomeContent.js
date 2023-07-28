import Footer from "../footer/Footer";
import NavigationBar from "../navbar/NavigationBar";
import WelcomeBody from "./WelcomeBody";


function WelcomeContent() {
    return (
        <div>
            <NavigationBar />
            <WelcomeBody />
            <Footer />
        </div>
    )
}

export default WelcomeContent;