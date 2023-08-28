import { Container} from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";
import LoginBody from "./LoginBody";
import AlreadyLoggedInBody from "./AlreadyLoggedInBody";

function LoginContent() {
    const { isAuthenticated  } = useContext(AuthContext);

    useEffect(() => {
        document.title = "Login to StudyMap - Roadmap to your Success!";
    });

    return (
        <Container maxWidth="md">
            {isAuthenticated ? <AlreadyLoggedInBody /> : <LoginBody/>}
        </Container>
    )
}

export default LoginContent;