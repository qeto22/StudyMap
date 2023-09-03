import { Button, Drawer, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CourseSections from "../course/CourseSections";

function CourseContentDrawer({ isDrawerOpen, toggleDrawer }) {
    return (<Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        variant="persistent"
    >
        <div
            style={{ width: "25vw", minHeight: "100vh", paddingLeft: "10px", paddingRight: "10px", paddingTop: "15px" }}
            role="presentation"
        >
            <div style={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "flex-start" }}>
                <Button onClick={toggleDrawer(false)}>
                    <NavigateNextIcon fontSize="large"></NavigateNextIcon>
                </Button>

                <Typography style={{width: "100%"}}>Learn Python Programming - Beginner to Master</Typography>
            </div>
            <CourseSections sections={[]} showTitle={false}></CourseSections>
        </div>
    </Drawer>);
}

export default CourseContentDrawer;