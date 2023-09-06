import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check'
import { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import FormTextInput from "../login/FormTextInput";
import axios from "axios";

function MentorshipRequestNotification({ notification }) {
    const additionalData = notification.additionalData.split(',');
    const sessionCount = parseInt(additionalData[0]);

    const [selectedDates, setSelectedDates] = useState(Array.from(Array(sessionCount).keys()).map(() => { return new Date() }));
    const [dialogWindow, setDialogWindow] = useState(false);
    const [datesSelectionWindow, setDatesSelectionWindow] = useState(false);
    const [messageToMentee, setMessageToMentee] = useState("");

    const handleDialogWindow = () => {
        setDialogWindow(false);
    };

    const handleDatesSelectionWindow = () => {
        setDatesSelectionWindow(false);
    };

    const onDateTimeChanged = (e, index) => {
        console.log(selectedDates);
        let newSelectedDates = [...selectedDates];
        newSelectedDates[index] = e;
        setSelectedDates(newSelectedDates);
    }

    const onMentorshipRequestApproved = () => {
        const data = {
            notificationId: notification.id,
            meetingDates: selectedDates,
            message: messageToMentee
        }

        axios.post('http://' + window.location.hostname + ':8080/api/v1/notification/accept-mentorship', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            console.log(response);
            handleDialogWindow();
        }).catch((error) => {
            console.log(error);
            handleDialogWindow();
        });
    }

    const rejectMentorshipRequest = () => {
        const data = {
            notificationId: notification.id,
        }

        axios.post('http://' + window.location.hostname + ':8080/api/v1/notification/reject-mentorship', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            handleDialogWindow();
        }).catch((error) => {
            handleDialogWindow();
        });
    }

    useEffect(() => {
        if (!dialogWindow) {
            setDatesSelectionWindow(false);
        }
    }, [dialogWindow]);

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
                    <Typography style={{ fontSize: "19px" }}>Mentorship Request</Typography>
                    <Typography style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.7)" }}>{notification.sender.name} sent you a mentorship request!</Typography>
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', justifyContent: additionalData.length > 1 ? "end" : "space-between", paddingRight: "10px" }}>

                    {additionalData.length === 1 ? (
                        <Button variant="contained" color="material" onClick={() => { setDialogWindow(true) }}>
                            <VisibilityIcon style={{ fontSize: "15px" }} />
                        </Button>
                    ) : null}
                    {additionalData.length === 1 ? (
                        <Button variant="contained" color="error">
                            <CloseIcon style={{ color: "white", fontSize: "15px" }} />
                        </Button>
                    ) : null}
                    {additionalData.length === 1 ? (
                        <Button variant="contained" color="success" onClick={() => setDatesSelectionWindow(true)}>
                            <CheckIcon style={{ color: "white", fontSize: "15px" }} />
                        </Button>
                    ) : null}
                    {additionalData.length > 1 && additionalData[1] === "ACCEPTED" ? (
                        <Button variant="contained" color="success" style={{ color: "white" }}>
                            <CheckIcon style={{ color: "white", fontSize: "16px", marginRight: "5px" }} /> ACCEPTED
                        </Button>
                    ) : null}
                    {additionalData.length > 1 && additionalData[1] === "REJECT" ? (
                        <Button variant="contained" color="error" style={{ color: "white" }}>
                            <CheckIcon style={{ color: "white", fontSize: "16px", marginRight: "5px" }} /> REJECTED
                        </Button>
                    ) : null}
                </Grid>
            </Grid>
            <Dialog open={dialogWindow} onClose={handleDialogWindow}>
                <DialogTitle>Mentorship request from {notification.sender.name}:</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {notification.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: "center" }}>
                    <Button variant="contained"
                        color="success"
                        style={{ color: "white", display: "flex", alignItems: "center", textAlign: "center" }}
                        onClick={() => setDatesSelectionWindow(true)}>
                        <CheckIcon /> Accept
                    </Button>
                    <Button variant="contained"
                        color="error"
                        style={{ color: "white" }}
                        onClick={rejectMentorshipRequest}>
                        <CloseIcon /> Deny
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={datesSelectionWindow} onClose={handleDatesSelectionWindow}>
                <DialogTitle>Select the dates you are available for the mentorship:</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please select dates for the mentorship sessions. You can select up to {sessionCount} dates. You can not change the dates later. Please select carefully.
                    </DialogContentText>
                    <FormTextInput style={{
                        marginTop: "25px",
                    }} label={"Optional message to " + notification.sender.name}
                        rows={3}
                        multiline={true}
                        onChange={(e) => setMessageToMentee(e.target.value)} />
                    <Grid container spacing={2} style={{ marginTop: "10px" }}>
                        {Array.from(Array(sessionCount).keys()).map((index) => {
                            return (
                                <Grid item xs={6}>
                                    <DateTimePicker slotProps={{ textField: { size: 'small' } }}
                                        onChange={(e) => onDateTimeChanged(e, index)}
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
                        onClick={onMentorshipRequestApproved}>
                        <CheckIcon /> Approve
                    </Button>
                    <Button variant="contained"
                        color="error"
                        style={{ color: "white" }}
                        onClick={handleDatesSelectionWindow}>
                        <CloseIcon /> Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default MentorshipRequestNotification;