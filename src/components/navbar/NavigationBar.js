import { Container, useMediaQuery, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./NavigationBar.css";
import { useState } from "react";
import NavigationBarDrawer from "./NavigationBarDrawer";
import NavigationBarDesktop from "./NavigationBarDesktop";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
    const navigate = useNavigate();

    const showDrawer = useMediaQuery((theme) => theme.breakpoints.down("lg"));
    const [open, setOpen] = useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const redirectToMainPage = () => {
        navigate('/');
    }

    return (
        <Container maxWidth="xl">
            <div className="navbar-wrapper">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="navbar-icon"
                    onClick={redirectToMainPage}
                ></img>
                <h2 className="company-title" onClick={redirectToMainPage}>StudyMap</h2>
                {showDrawer ? (
                    <>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                            style={{}}
                        >
                            <MenuIcon />
                        </IconButton>
                        <NavigationBarDrawer
                            open={open}
                            handleDrawerToggle={handleDrawerToggle}
                        ></NavigationBarDrawer>
                    </>
                ) : (
                    <>
                        <NavigationBarDesktop></NavigationBarDesktop>
                    </>
                )}
            </div>
        </Container>
    );
}

export default NavigationBar;
