import Footer from "../footer/Footer";
import NavigationBar from "../navbar/NavigationBar";
import AuthorBody from "./AuthorBody";

function AuthorContent() {
    return (
        <div>
            <NavigationBar />
            <AuthorBody />
            <Footer />
        </div>
    )
}

export default AuthorContent;