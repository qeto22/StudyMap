import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Typography, Snackbar } from "@mui/material";
import FormTextInput from "../login/FormTextInput";
import axios from 'axios';
import jwt_decode from 'jwt-decode';


function SettingsTab() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');  
    const [snackbar, setSnackbar] = useState(null);
    

    const handleChangePassword = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        const formData = new FormData();
        formData.append("request", { type: 'application/json' });
        if (newPassword !== null) {
            formData.append("newPassword", newPassword);
        }

        try {
            const response = await axios.post('http://' + window.location.hostname + ':8080/api/v1/user/update-password', formData, config);

            if (response.status === 200) {
                // Refresh the window and remove query parameters
                window.location.href = window.location.origin + window.location.pathname;
            } else {
                setSnackbar({
                    "severity": "error",
                    "message": "Error occurred updating password!"
                });
            }
        } catch (ex) {
            setSnackbar({
                "severity": "error",
                "message": "Error occurred updating password!"
            });
        }
    };


    return (
        <Card elevation={5} style={{ width: "100%", background: "#12181B", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
            <Typography style={{ margin: "15px 0 12px 25px", color: "#FFFFFF" }}>Settings</Typography>
            <Divider />
            <div style={{
                padding: "0 25px",
                marginTop: "12px",
                marginBottom: "15px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
            }}>
                <FormTextInput label="New Password" type={'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <FormTextInput label="Confirm Password" type={'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <Button onClick={handleChangePassword} variant="contained" color="material" style={{ width: "100px", alignSelf: "flex-end", fontSize: "13px" }}>Update</Button>
            </div>
        </Card>
    );
}

export default SettingsTab;
