import Footer from "../footer/Footer";
import NavigationBar from "../navbar/NavigationBar";
import AuthorBody from "./AuthorBody";
import { useParams } from "react-router-dom";

function AuthorContent() {
    const { author } = useParams();
    
    return (
        <div>
            <NavigationBar />
            <AuthorBody authorUsername={author}/>
            <Footer />
        </div>
    )
}

export default AuthorContent;