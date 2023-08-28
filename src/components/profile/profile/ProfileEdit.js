import { Button, Card, Divider, Typography } from "@mui/material";
import FormTextInput from "../../login/FormTextInput";
import { useState } from "react";

function ProfileEdit({ user }) {
    const [description, setDescription] = useState(user == null ? "" : user.description);
    const [profileImage, setProfileImage] = useState(null);

    return (<Card elevation={5} style={{ width: "100%", background: "#12181B", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
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
            <FormTextInput label="Profile Image" type={'file'} />
            <FormTextInput label="Description" multiline={true} rows={3} defaultValue={description} onChange={(e) => setDescription(e.target.value)} />
            <Button variant="contained" color="material" style={{ width: "100px", alignSelf: "flex-end", fontSize: "13px" }}>Update</Button>
        </div>
    </Card>)
}

export default ProfileEdit;