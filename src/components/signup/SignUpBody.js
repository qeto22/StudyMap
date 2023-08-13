import { Alert, Button, Collapse, Typography } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from "react";
import * as React from 'react';
import axios from "axios";
import FormTextInput from "../login/FormTextInput";
import "./SignUpBody.css";
import { AuthContext } from "../AuthProvider";

function SignUpBody() {
    const { setIsAuthenticated } = React.useContext(AuthContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userType, setUserType] = useState('');

    const handleSignup = async () => {
        setErrorMessage('');
        try {
            if (password !== confirmPassword) {
                setErrorMessage('Passwords are not matching!');
                return;
            }
            const response = await axios.post('http://localhost:8080/api/v1/auth/signup', {
                firstName,
                lastName,
                userType,
                username,
                email,
                password,
            });
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

    const handleUserTypeChange = (event, userType) => {
        setUserType(userType);
      };

    return (
        <div className="signup-form-wrapper">
            <img src="/logo.png" alt="logo" className="logo" />
            <Typography className="signup-title">Create an Account</Typography>
            <ToggleButtonGroup
                color="primary"
                value={userType}
                exclusive
                onChange={handleUserTypeChange}
                aria-label="Platform"
            >
                <ToggleButton
                    value="MENTEE"
                    className={`mentee-button ${userType === "MENTEE" ? "selected" : ""}`}
                >
                    Mentee
                </ToggleButton>
                <ToggleButton
                    value="MENTOR"
                    className={`mentor-button ${userType === "MENTOR" ? "selected" : ""}`}
                >
                    Mentor
                </ToggleButton>
            </ToggleButtonGroup>
            <div className="signup-form-content">
                <Collapse in={errorMessage !== ''}>
                    <Alert style={{
                        marginBottom: "10px",
                        fontSize: "14px"
                    }} variant="filled" severity="error" open>{errorMessage}</Alert>
                </Collapse>
                <FormTextInput onChange={e => setFirstName(e.target.value)} label="First Name" />
                <FormTextInput onChange={e => setLastName(e.target.value)} label="Last Name" style={{
                    marginTop: "10px"
                }} />
                <FormTextInput onChange={e => setUsername(e.target.value)} label="Username" style={{
                    marginTop: "10px"
                }} />
                <FormTextInput onChange={e => setEmail(e.target.value)} style={{
                    marginTop: "10px"
                }} label="Email" />
                <FormTextInput onChange={e => setPassword(e.target.value)} style={{
                    marginTop: "10px"
                }} label="Password" type="password" />
                <FormTextInput onChange={e => setConfirmPassword(e.target.value)} style={{
                    marginTop: "10px"
                }} label="Confirm Password" type="password" />
                <Button onClick={handleSignup} sx={{
                    width: "100%",
                    fontFamily: "cubano",
                    letterSpacing: "1px",
                    marginTop: "20px"
                }} variant="contained" color="material">Sign Up</Button>
            </div>
        </div>
    );
}

export default SignUpBody;
