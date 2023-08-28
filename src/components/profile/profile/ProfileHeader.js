import { RemoveRedEye, Share } from "@mui/icons-material"
import { Button, Card, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";

function ProfileHeader({ user }) {
    const navigate = useNavigate();

    return (<Card elevation={5} style={{ width: "100%", background: "#121212", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "30px",
            padding: "25px"
        }}>
            <img style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%"
            }} alt="mee" src={user != null && user.imageUrl ? 'http://' + window.location.hostname + `:8080/image/${user.imageUrl}` : '/default-icon.png'} />
            <div>
                <Typography style={{
                    fontSize: "20px",
                }}>{user === null ? '' : (user.firstName + ' ' + user.lastName)}</Typography>
                <Typography style={{
                    fontSize: "16px",
                    color: "rgba(255, 255, 255, 0.6)"
                }}>{user === null ? '' : (user.username)}</Typography>
                <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                    <Button startIcon={<Share />}
                        variant="contained"
                        color="material"
                        onClick={() => { console.log("Share your Profile") }}
                        style={{
                            fontSize: "12px"
                        }}>Share your Profile</Button>
                    <Button startIcon={<RemoveRedEye />}
                        variant="outlined"
                        color="primary"
                        onClick={() => { navigate(`/author/${user.username}`) }}
                        style={{
                            fontSize: "12px"
                        }}>View Public Profile</Button>
                </div>
            </div>
        </div>
    </Card>);
}

export default ProfileHeader;