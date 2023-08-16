import { Alert, Button, Collapse, Typography } from "@mui/material";
import FormTextInput from "./FormTextInput";
import "./LoginBody.css";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";

function LoginBody() {
    const { setIsAuthenticated } = useContext(AuthContext);

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = async () => {
        setErrorMessage('');
        try {
            const response = await axios.post('http://' + window.location.hostname + ':8080/api/v1/auth/authenticate', { usernameOrEmail, password });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);
            } else if (response.status !== 403) {
                setErrorMessage('Invalid username, email or password!')
            }
        } catch (error) {
            setErrorMessage('Invalid username, email or password!')
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
                <FormTextInput  onChange={e => setUsernameOrEmail(e.target.value)} label="Username or email address" />
                <FormTextInput onChange={e => setPassword(e.target.value)} type="password" style={{
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