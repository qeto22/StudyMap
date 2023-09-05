import NavbarMentorshipRequestNotification from "./NavbarMentorshipRequestNotification";

function NavbarNotification({ notification }) {
    switch (notification.type) {
        case 'MENTORSHIP_REQUEST':
            return <NavbarMentorshipRequestNotification notification={notification} />;
        default:
            return 'Unknown Notification Type';
    }
}

export default NavbarNotification;