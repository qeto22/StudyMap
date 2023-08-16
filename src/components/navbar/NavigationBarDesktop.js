import { useNavigate } from 'react-router-dom';
import { Button, List, ListItemButton, ListItemIcon, ListItemText, Popover, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchBar from './SearchBar';
import CategoriesButton from './CategoriesButton';
import { useContext, useState } from 'react';
import { AuthContext } from '../AuthProvider';

function NavigationBarDesktop() {
    const { isAuthenticated } = useContext(AuthContext);

    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const profilePopoverOpen = Boolean(profileAnchorEl);

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate("/signup")
    }

    const onLogoutClicked = () => {
        localStorage.removeItem('token');
        navigate(0);
    }

    return (
        <>
            <div className='navbar-item'><CategoriesButton></CategoriesButton></div>
            <SearchBar width={600} marginLeft={5} />
            <span className='navbar-item'>
                <Tooltip title="Cart">
                    <ShoppingCartIcon></ShoppingCartIcon>
                </Tooltip>
            </span>
            {!isAuthenticated ? (
                <div className='navbar-item'>
                    <Button onClick={handleLoginClick}
                        sx={{
                            width: "130px",
                            fontFamily: "cubano",
                            letterSpacing: "1px"
                        }} variant="outlined" >Log in</Button>
                </div>
            ) : (<></>)}

            {!isAuthenticated ? (
                <div style={{ marginLeft: 10 }}>
                    <Button onClick={handleSignupClick} sx={{
                        width: "130px",
                        fontFamily: "cubano",
                        letterSpacing: "1px"
                    }} variant="contained" color="material">Sign Up</Button>
                </div>) : (<></>)}

            {isAuthenticated ? (
                <span className='navbar-item'>
                    <Tooltip title="Notifications">
                        <NotificationsIcon></NotificationsIcon>
                    </Tooltip>
                </span>
            ) : (<></>)}

            {isAuthenticated ? (
                <div className='navbar-item'>
                    <Button
                        sx={{
                            width: "130px",
                            fontFamily: "cubano",
                            letterSpacing: "1px"
                        }} variant="outlined" >My courses</Button>
                </div>
            ) : (<></>)}


            {isAuthenticated ? (
                <div style={{
                    margin: "0 20px"
                }}>
                    <AccountCircleIcon onMouseEnter={(event) => {
                        setProfileAnchorEl(event.currentTarget);
                    }} style={{
                        fontSize: "32px",
                        cursor: "pointer"
                    }}></AccountCircleIcon>
                    <Popover
                        open={profilePopoverOpen}
                        anchorEl={profileAnchorEl}
                        onClose={() => setProfileAnchorEl(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        onMouseLeave={() => setProfileAnchorEl(null)}  // Add onMouseLeave to the Popover
                    >
                        <List style={{ width: '220px', backgroundColor: '#121212', border: "1px solid rgba(255, 255, 255, 0.4)" }}>  {/* Adjust width as per your need */}
                            <ListItemButton divider onClick={() => navigate('/profile')} style={{ padding: '8px' }}>
                                <ListItemIcon>
                                    <AccountCircleIcon style={{ fontSize: '23px' }} />
                                </ListItemIcon>
                                <ListItemText primary="Profile" primaryTypographyProps={{ fontSize: '15px' }} />
                            </ListItemButton>
                            <ListItemButton style={{ padding: '8px' }}>
                                <ListItemIcon>
                                    <AccountTreeIcon style={{ fontSize: '23px' }} />
                                </ListItemIcon>
                                <ListItemText primary="My Paths" primaryTypographyProps={{ fontSize: '15px' }} />
                            </ListItemButton>
                            <ListItemButton divider style={{ padding: '8px' }}>
                                <ListItemIcon>
                                    <SupervisorAccountIcon style={{ fontSize: '23px' }} />
                                </ListItemIcon>
                                <ListItemText primary="Meeting with Mentors" primaryTypographyProps={{ fontSize: '15px' }} />
                            </ListItemButton>
                            <ListItemButton divider style={{ padding: '8px' }}>
                                <ListItemIcon>
                                    <SettingsIcon style={{ fontSize: '23px' }} />
                                </ListItemIcon>
                                <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: '15px' }} />
                            </ListItemButton>
                            <ListItemButton onClick={onLogoutClicked} style={{ padding: '8px' }}>
                                <ListItemIcon>
                                    <LogoutIcon style={{ fontSize: '23px' }} />
                                </ListItemIcon>
                                <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '15px' }} />
                            </ListItemButton>
                        </List>
                    </Popover>
                </div>
            ) : (<></>)}

            <Tooltip title="Light Mode">
                <Button sx={{
                    width: "30px",
                    fontFamily: "cubano",
                    letterSpacing: "1px"
                }} variant="outlined"><LightModeIcon></LightModeIcon></Button>
            </Tooltip>
        </>
    );
}

export default NavigationBarDesktop;