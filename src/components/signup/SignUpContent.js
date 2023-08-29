import { Container } from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";
import AlreadyLoggedInBody from "../login/AlreadyLoggedInBody"
import SignUpBody from "./SignUpBody";

function SignUpContent() {
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        document.title = "Sign up to StudyMap - Roadmap to your Success!";
    });

    return (
        <Container maxWidth="md">
            {isAuthenticated ? <AlreadyLoggedInBody /> : <SignUpBody />}
        </Container>
    );
}

export default SignUpContent;
