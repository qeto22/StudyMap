import { Alert, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AlreadyLoggedInBody() {
    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/");
    }

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            navigate('/');
        }
    }, [countdown, navigate]);

    return (
        <div className="login-wrapper">
            <img src="/logo.png" alt="logo" className="logo" />
            <div className="login-form-wrapper">
                <Typography style={{
                    textAlign: "center",
                    fontFamily: "cubano"
                }}>You are logged in</Typography>
                <Alert style={{
                    background: "#388E3C",
                    color: "white",
                    margin: "10px 0",
                    textAlign: "center"
                }} variant="fill" severity="success">You will be redirected in {countdown} </Alert>
                <Button onClick={handleButtonClick} sx={{
                    width: "100%",
                    fontFamily: "cubano",
                    letterSpacing: "1px",
                    marginTop: "10px"
                }} variant="contained" color="material">Go back now!</Button>
            </div>
        </div>
    )
}

export default AlreadyLoggedInBody;