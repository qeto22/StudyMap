import MentorshipRequestNotification from "./MentorshipRequestNotification";

function Notification({notification}) {
    if (notification.type === 'MENTORSHIP_REQUEST') {
        return <MentorshipRequestNotification notification={notification} />
    }
    return "Unknown Notification Type";
}

export default Notification;