import { Alert, Button, Card, Divider, Snackbar, Typography } from "@mui/material";
import FormTextInput from "../../login/FormTextInput";
import { useState } from "react";
import axios from "axios";

function ProfileEdit({ user }) {
    const [snackbar, setSnackbar] = useState(null);

    const [description, setDescription] = useState(user == null ? "" : user.description);
    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
        }
    };

    const onUpdateClicked = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        const formData = new FormData();
        formData.append("request", new Blob([JSON.stringify({
            description,
        })], { type: 'application/json' }));
        if (profileImage !== null) {
            formData.append("image", profileImage, profileImage.name);
        }

        try {
            const response = await axios.post('http://' + window.location.hostname + ':8080/api/v1/user/update', formData, config);

            if (response.status === 200) {
                // Refresh the window and remove query parameters
                window.location.href = window.location.origin + window.location.pathname;
            } else {
                setSnackbar({
                    "severity": "error",
                    "message": "Error occurred updating profile!"
                });
            }
        } catch (ex) {
            setSnackbar({
                "severity": "error",
                "message": "Error occurred updating profile!"
            });
        }
    }

    const onSnackbarClose = () => {
        setSnackbar(null);
    }

    return (<Card elevation={5} style={{ width: "100%", background: "#121212", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
        <Typography style={{ margin: "15px 0 12px 25px" }}>Edit Your Profile</Typography>
        <Divider />
        <div style={{
            padding: "0 25px",
            marginTop: "12px",
            marginBottom: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
        }}>
            <FormTextInput label="Profile Image" type={'file'} onChange={handleImageChange} />
            <FormTextInput label="Description" multiline={true} rows={3} defaultValue={description} onChange={(e) => setDescription(e.target.value)} />
            <Button variant="contained"
                color="material"
                style={{ width: "100px", alignSelf: "flex-end", fontSize: "13px" }}
                onClick={onUpdateClicked}>Update</Button>

        </div>
        <Snackbar open={snackbar !== null} autoHideDuration={6000} onClose={onSnackbarClose}>
            <Alert onClose={onSnackbarClose} severity={snackbar === null ? null : snackbar.severity} sx={{ width: '100%' }}>
                {snackbar === null ? null : snackbar.message}
            </Alert>
        </Snackbar>
    </Card>)
}

export default ProfileEdit;