import { Grid, Typography } from "@mui/material";

function NavbarMentorshipRequestNotification({ notification }) {
    return (<Grid container style={{ padding: "5px", cursor: "pointer" }}>
        <Grid item xs={2.5} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={`http://localhost:8080/image/${notification.sender.imageUrl}`} alt='course icon' style={{ width: '40px', height: '40px', borderRadius: "50%" }} />
        </Grid>
        <Grid item xs={9.5}>
            <Typography style={{ fontSize: "14px" }}>Mentorship Request</Typography>
            <Typography style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.7)" }}>{notification.sender.name} sent you a mentorship request!</Typography>
        </Grid>
    </Grid>);
}

export default NavbarMentorshipRequestNotification;