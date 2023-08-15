import { Drawer } from "@mui/material";

function CourseContentDrawer({ isDrawerOpen, toggleDrawer }) {
    return (<Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        variant="persistent"
    >
        <div
            style={{ width: "25vw", minHeight: "100vh" }}
            role="presentation"
        >
        </div>
    </Drawer>);
}

export default CourseContentDrawer;