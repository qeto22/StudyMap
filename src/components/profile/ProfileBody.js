import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import SchoolIcon from '@mui/icons-material/School';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Container, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import StudyMapsGrid from "./StudyMapsGrid";
import CourseGrid from "./CourseGrid";
import { AuthContext } from "../AuthProvider";
import ProfileTab from "./profile/ProfileTab";
import SettingsTab from "./SettingsTab";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ProfileBody() {
    const { user } = useContext(AuthContext);

    const query = useQuery();
    const tabValue = query.get("tab") || "profile";
    const [selectedItem, setSelectedItem] = useState(tabValue);

    let content;
    switch (selectedItem) {
        case "my-paths":
            content = <StudyMapsGrid />;
            break;
        case "courses":
            content = <CourseGrid />;
            break;
        case "profile":
            content = <ProfileTab />;
            break;
        case "settings":
            content = <SettingsTab />;
            break;
        default:
            content = null;
            break;
    }

    return (<Container maxWidth="lg">
        <Typography variant="h6" style={{ marginTop: "30px" }}>Profile</Typography>
        <Grid container style={{ marginTop: "15px", marginBottom: "40px" }}>
            <Grid item md={2.5}>
                <List style={{ border: "1px solid rgba(255, 255, 255, 0.3)", borderRadius: "6px" }}>
                    <ListItem divider disablePadding>
                        <ListItemButton
                            selected={selectedItem === "profile"}
                            onClick={() => setSelectedItem("profile")}>
                            <ListItemIcon>
                                <AccountCircleOutlined style={{ fontSize: '23px' }} />
                            </ListItemIcon>
                            <ListItemText primary="Profile" primaryTypographyProps={{ fontSize: '15px' }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedItem === "courses"}
                            onClick={() => setSelectedItem("courses")}>
                            <ListItemIcon>
                                <SchoolIcon style={{ fontSize: '23px' }} />
                            </ListItemIcon>
                            <ListItemText primary="Courses" primaryTypographyProps={{ fontSize: '15px' }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedItem === "my-paths"}
                            onClick={() => setSelectedItem("my-paths")}>
                            <ListItemIcon>
                                <AccountTreeIcon style={{ fontSize: '23px' }} />
                            </ListItemIcon>
                            <ListItemText primary="My Paths" primaryTypographyProps={{ fontSize: '15px' }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem divider disablePadding>
                        <ListItemButton
                            selected={selectedItem === "mentor-meetings"}
                            onClick={() => setSelectedItem("mentor-meetings")}>
                            <ListItemIcon>
                                <SupervisorAccountIcon style={{ fontSize: '23px' }} />
                            </ListItemIcon>
                            <ListItemText primary={"Meeting with " + (user && user.type === 'MENTOR' ? 'Mentee' : 'Mentors')} primaryTypographyProps={{ fontSize: '15px' }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem divider disablePadding>
                        <ListItemButton
                            selected={selectedItem === "settings"}
                            onClick={() => setSelectedItem("settings")}>
                            <ListItemIcon>
                                <Settings style={{ fontSize: '23px' }} />
                            </ListItemIcon>
                            <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: '15px' }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Grid>
            <Grid item md={0.5} style={{}}></Grid>
            <Grid item md={9}>{content}</Grid>
        </Grid>
    </Container >);
}

export default ProfileBody;