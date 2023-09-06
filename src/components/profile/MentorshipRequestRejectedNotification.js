import { Grid, Typography } from "@mui/material";

function MentorshipRequestRejectedNotification({ notification }) {
    return (<Grid container style={{
        marginTop: "15px", border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "6px",
        paddingTop: "10px",
        paddingBottom: "10px",
        display: "flex",
        alignItems: "center",
    }}>
        <Grid item xs={2} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={'http://' + window.location.hostname + `:8080/image/${notification.sender.imageUrl}`} alt='course icon' style={{ width: '60px', height: '60px', borderRadius: "50%" }} />
        </Grid>
        <Grid item xs={10}>
            <Typography style={{ fontSize: "19px" }}>Mentorship Rejected</Typography>
            <Typography style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.7)" }}>{notification.sender.name} has rejected your mentorship request!</Typography>
        </Grid>
    </Grid>);
}

export default MentorshipRequestRejectedNotification;