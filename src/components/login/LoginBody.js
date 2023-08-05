import { Alert, Button, Collapse, Snackbar, Typography } from "@mui/material";
import FormTextInput from "./FormTextInput";
import "./LoginBody.css";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";

function LoginBody() {
    const { setIsAuthenticated } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = async () => {
        setErrorMessage('');
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);
            } if (response.status === 401) {
                setErrorMessage('Invalid Username or Password!') // todo
            } else {
                setErrorMessage('Invalid Username or Password!') // todo
            }
        } catch (error) {
            setErrorMessage('Invalid Username or Password!') // todo
        }
    }

    return (
        <div className="login-wrapper">
            <img src="/logo.png" alt="logo" className="logo" />
            <Typography className="login-title">Sign in to StudyMap</Typography>
            <div className="login-form-wrapper">
                <Collapse in={errorMessage !== ''}>
                    <Alert style={{
                        marginBottom: "10px",
                        fontSize: "14px"
                    }} variant="filled" severity="error" open>{errorMessage}</Alert>
                </Collapse>
                <FormTextInput label="Username or email address" />
                <FormTextInput style={{
                    marginTop: "10px"
                }} label="Password" />
                <Button onClick={handleLogin} sx={{
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
        </div>
    )
}

export default LoginBody;