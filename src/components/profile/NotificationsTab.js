import { Alert, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import Notification from "./Notification";

function NotificationsTab() {
    const [refreshed, setRefreshed] = useState(false);

    const [notifications, setNotifications] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setNotifications(null);
        setError(null);

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        };

        axios.get('http://' + window.location.hostname + ':8080/api/v1/notification', config)
            .then((response) => {
                setNotifications(response.data);
            })
            .catch(error => {
                setError("Error occurred while fetching notifications, Please refresh and try again!")
            });
    }, [refreshed]);

    return (<div>
        <div style={{ width: "100%", display: 'flex', justifyContent: "end" }}>
            <Button variant="outlined" onClick={() => setRefreshed(!refreshed)}><RefreshIcon /></Button>
        </div>
        {error ? <div style={{ width: "100%", marginTop: "5px" }}>
            <Alert style={{ width: "60%", margin: "0 auto" }} variant="filled" severity="error">{error}</Alert>
        </div> : null}

        {notifications != null && notifications.length === 0 && error === null ? <div style={{ width: "100%", marginTop: "5px" }}>
            <Alert style={{ width: "60%", margin: "0 auto", color: "white" }} variant="filled" severity="info">No notifications to show!</Alert>
        </div> : null}

        {notifications != null && notifications.length >= 0 && error === null ? (
            <div>
                {notifications.map((notification) => (<Notification notification={notification}></Notification>))}
            </div>
        ) : null}

    </div>);
}

export default NotificationsTab;