import { useNavigate } from 'react-router-dom';
import { Button, Divider, List, ListItemButton, ListItemIcon, ListItemText, Popover, Tooltip, Typography } from '@mui/material';
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
import CartItem from '../cart/CartItem';

function NavigationBarDesktop() {
    const { isAuthenticated } = useContext(AuthContext);

    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const profilePopoverOpen = Boolean(profileAnchorEl);

    const [cartAnchorEl, setCartAnchorElement] = useState(null);
    const cartPopoverOpen = Boolean(cartAnchorEl);

    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const onCartItemRemoved = (courseIdToDelete) => {
        const newCartItems = cartItems.filter(existingCartId => existingCartId !== courseIdToDelete);
        localStorage.setItem('cart', JSON.stringify(newCartItems));
    }

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
                    <ShoppingCartIcon onMouseEnter={(event) => {
                        setCartAnchorElement(event.currentTarget);
                    }}></ShoppingCartIcon>
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
                    <Button onClick={() => navigate('/profile?tab=courses')}
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
                            <ListItemButton onClick={() => navigate('/profile?tab=my-paths')} style={{ padding: '8px' }}>
                                <ListItemIcon>
                                    <AccountTreeIcon style={{ fontSize: '23px' }} />
                                </ListItemIcon>
                                <ListItemText primary="My Paths" primaryTypographyProps={{ fontSize: '15px' }} />
                            </ListItemButton>
                            <ListItemButton onClick={() => navigate('/profile?tab=mentor-meetings')} divider style={{ padding: '8px' }}>
                                <ListItemIcon>
                                    <SupervisorAccountIcon style={{ fontSize: '23px' }} />
                                </ListItemIcon>
                                <ListItemText primary="Meeting with Mentors" primaryTypographyProps={{ fontSize: '15px' }} />
                            </ListItemButton>
                            <ListItemButton onClick={() => navigate('/profile?tab=settings')} divider style={{ padding: '8px' }}>
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

            <Popover
                id={cartPopoverOpen ? 'simple-popover' : undefined}
                open={cartPopoverOpen}
                anchorEl={cartAnchorEl}
                onClose={() => setCartAnchorElement(null)}
                style={{ marginTop: "15px" }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div style={{ width: "325px" }}>
                    {cartItems.length === 0 ?
                        (<Typography style={{ width: "100%", textAlign: "center", marginTop: "15px", fontSize: "14px", color: "rgba(255, 255, 255, 0.5)" }}>Your cart is empty</Typography>) : <></>}
                    {cartItems.length > 0 ? cartItems.map((couseId, index) => {
                        return (<div style={{ marginTop: "8px" }}>
                            <CartItem size='small' onRemove={() => onCartItemRemoved(couseId)}></CartItem>
                        </div>)
                    }) : <></>}
                    <Divider style={{ marginTop: "15px" }}></Divider>
                    <Button disabled={cartItems.length === 0}
                        color='material'
                        style={{ width: "100%", textTransform: "none" }}
                        onClick={() => navigate('/order')}>View Cart</Button>
                </div>
            </Popover>
        </>
    );
}

export default NavigationBarDesktop;