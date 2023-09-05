import MentorshipRequestAcceptedNotification from "./MentorshipRequestAcceptedNotification";
import MentorshipRequestNotification from "./MentorshipRequestNotification";

function Notification({notification}) {
    switch (notification.type) {
        case 'MENTORSHIP_REQUEST':
            return <MentorshipRequestNotification notification={notification} />;
        case 'MENTORSHIP_ACCEPTED':
            return <MentorshipRequestAcceptedNotification notification={notification} />;
        default:
            return 'Unknown Notification Type';
    }
}

export default Notification;