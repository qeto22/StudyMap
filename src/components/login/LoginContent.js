import { Container} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import LoginBody from "./LoginBody";
import AlreadyLoggedInBody from "./AlreadyLoggedInBody";

function LoginContent() {
    const { isAuthenticated  } = useContext(AuthContext);

    return (
        <Container maxWidth="md">
            {isAuthenticated ? <AlreadyLoggedInBody /> : <LoginBody/>}
        </Container>
    )
}

export default LoginContent;