import { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import ProfileHeader from "./ProfileHeader";
import ProfileEdit from "./ProfileEdit";

function ProfileTab() {
    const { user } = useContext(AuthContext);

    return (
        <div style={{ display: "flex", gap: "30px", flexDirection: "column" }}>
            <ProfileHeader user={user} />
            {user !== null ? <ProfileEdit user={user} /> : <></>}
        </div>
    )
}

export default ProfileTab;