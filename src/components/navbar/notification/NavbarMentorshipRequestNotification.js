import { Grid, Typography } from "@mui/material";

function NavbarMentorshipNotification({ type, notification }) {

    const getHeaderMessage = () => {
        switch (type) {
            case 'request':
                return 'Mentorship Request';
            case 'accepted':
                return 'Mentorship Accepted';
            case 'rejected':
                return 'Mentorship Rejected';
            default:
                return 'Unknown Notification Type';
        }
    }

    const getBodyMessage = () => {
        switch (type) {
            case 'request':
                return `${notification.sender.name} sent you a mentorship request!`;
            case 'accepted':
                return `${notification.sender.name} accepted your mentorship request!`;
            case 'rejected':
                return `${notification.sender.name} rejected your mentorship request!`;
            default:
                return 'Unknown Notification Type';
        }
    }

    return (<Grid container style={{ padding: "5px", cursor: "pointer" }}>
        <Grid item xs={2.5} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={`http://localhost:8080/image/${notification.sender.imageUrl}`} alt='course icon' style={{ width: '40px', height: '40px', borderRadius: "50%" }} />
        </Grid>
        <Grid item xs={9.5}>
            <Typography style={{ fontSize: "14px" }}>{getHeaderMessage()}</Typography>
            <Typography style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.7)" }}>{getBodyMessage()}</Typography>
        </Grid>
    </Grid>);
}

export default NavbarMentorshipNotification;