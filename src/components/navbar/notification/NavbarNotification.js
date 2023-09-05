import NavbarMentorshipNotification from "./NavbarMentorshipRequestNotification";

function NavbarNotification({ notification }) {
    switch (notification.type) {
        case 'MENTORSHIP_REQUEST':
            return <NavbarMentorshipNotification type='request' notification={notification} />;
        case 'MENTORSHIP_ACCEPTED':
            return <NavbarMentorshipNotification type='accepted' notification={notification} />;
        case 'MENTORSHIP_REJECTED':
            return <NavbarMentorshipNotification type='rejected' notification={notification} />;
        default:
            return 'Unknown Notification Type';
    }
}

export default NavbarNotification;