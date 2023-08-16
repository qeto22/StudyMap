import Footer from "../footer/Footer";
import NavigationBar from "../navbar/NavigationBar";
import ProfileBody from "./ProfileBody";

function ProfileContent() {
    return (<div>
        <NavigationBar />
        <ProfileBody />
        <Footer />
    </div>);
}

export default ProfileContent;