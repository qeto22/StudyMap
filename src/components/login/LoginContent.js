import { Button, Container, Typography } from "@mui/material";
import "./LoginContent.css"
import FormTextInput from "./FormTextInput";

function LoginContent() {

    return (
        <Container maxWidth="md" className="login-wrapper">
            <img src="/logo.png" alt="logo" className="logo" />
            <Typography className="login-title">Sign in to StudyMap</Typography>
            <div className="login-form-wrapper">
                <FormTextInput label="Username or email address" />
                <FormTextInput style={{
                    marginTop: "10px"
                }} label="Password" />
                <Button sx={{
                    width: "100%",
                    fontFamily: "cubano",
                    letterSpacing: "1px",
                    marginTop: "20px"
                }} variant="contained" color="material">Log in</Button>
            </div>

            <div className="login-form-wrapper">
                <Typography style={{
                    fontSize: "14px",
                    textAlign: "center"
                }}>Don't have an account? <a href="/signup" style={{
                    color: "rgb(47, 129, 247)",
                    textDecoration: "none",
                }}>Create one</a> </Typography>
            </div>
        </Container>
    )
}

export default LoginContent;