import { Container } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import AlreadyLoggedInBody from "../login/AlreadyLoggedInBody"
import SignUpBody from "./SignUpBody";

function SignUpContent() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Container maxWidth="md">
            {isAuthenticated ? <AlreadyLoggedInBody /> : <SignUpBody />}
        </Container>
    );
}

export default SignUpContent;
