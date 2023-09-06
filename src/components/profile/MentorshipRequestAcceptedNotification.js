import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check'
import PaymentsIcon from '@mui/icons-material/Payments';
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router";


function MentorshipRequestAcceptedNotification({ notification }) {
    const navigate = useNavigate();

    const additionalData = notification.additionalData.split(',');
    const paidOrRejected = additionalData[additionalData.length - 1] === 'ACCEPTED' || additionalData[additionalData.length - 1] === 'REJECT';
    const datesCount = paidOrRejected ? additionalData.length - 1 : additionalData.length;

    const [showDialogWindow, setShowDialogWindow] = useState(false);

    const rejectAcceptedOffer = () => {
        const data = {
            notificationId: notification.id,
        }

        axios.post('http://' + window.location.hostname + ':8080/api/v1/notification/reject-accepted-mentorship', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            console.log(response);
            setShowDialogWindow(false);
        }).catch((error) => {
            console.log(error);
            setShowDialogWindow(false);
        });
    }

    const onPayClicked = () => {
        localStorage.setItem("mentorshipPayment", JSON.stringify({
            notification: notification,
            amount: datesCount * 25
        }));
        navigate("/order");
    }

    return (
        <div>
            <Grid container style={{
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
                <Grid item xs={7}>
                    <Typography style={{ fontSize: "19px" }}>Mentorship Request Accepted</Typography>
                    <Typography style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.7)" }}>{notification.sender.name} has accepted your offer, check out the details and proceed to payment!</Typography>
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', justifyContent: "end", gap: "15px", paddingRight: "10px" }}>
                    {!paidOrRejected ? (
                        <Button variant="contained" color="material" onClick={() => { setShowDialogWindow(true) }}>
                            <VisibilityIcon style={{ fontSize: "15px", marginRight: "5px" }} /> VIEW OFFER
                        </Button>
                    ) : null}
                    {paidOrRejected && additionalData[additionalData.length - 1] === "ACCEPTED" ? (
                        <Button variant="contained" color="success" style={{ color: "white" }}>
                            <CheckIcon style={{ color: "white", fontSize: "16px", marginRight: "5px" }} /> PAID
                        </Button>
                    ) : null}
                    {paidOrRejected && additionalData[additionalData.length - 1] === "REJECT" ? (
                        <Button variant="contained" color="error" style={{ color: "white" }}>
                            <CheckIcon style={{ color: "white", fontSize: "16px", marginRight: "5px" }} /> REJECTED
                        </Button>
                    ) : null}
                </Grid>
            </Grid>
            <Dialog open={showDialogWindow} onClose={() => setShowDialogWindow(false)}>
                <DialogTitle>{notification.sender.name} has accepted your request!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography style={{ color: "white", fontSize: "17px" }}>Message from mentor:</Typography>
                        <Typography style={{ fontSize: "15px", marginTop: "6px" }}>{notification.message}</Typography>
                    </DialogContentText>
                    <Grid container spacing={2} style={{ marginTop: "10px" }}>
                        {Array.from(Array(datesCount).keys()).map((index) => {
                            return (
                                <Grid item xs={6}>
                                    <DateTimePicker disabled value={dayjs(additionalData[index])} slotProps={{ textField: { size: 'small' } }}
                                        label={"Session N" + (index + 1)} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </DialogContent>
                <DialogActions style={{ justifyContent: "center" }}>
                    <Button variant="contained"
                        color="success"
                        style={{ color: "white", display: "flex", alignItems: "center", textAlign: "center" }}
                        onClick={() => onPayClicked()}>
                        <PaymentsIcon style={{ marginRight: "5px" }} /> Pay ${datesCount * 25}
                    </Button>
                    <Button variant="contained"
                        color="error"
                        style={{ color: "white" }}
                        onClick={() => rejectAcceptedOffer()}>
                        <CloseIcon /> Reject
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MentorshipRequestAcceptedNotification;