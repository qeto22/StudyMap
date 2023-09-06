import { useNavigate } from 'react-router-dom';
import { Button, ClickAwayListener, Divider, List, ListItemButton, ListItemIcon, ListItemText, Popover, Tooltip, Typography } from '@mui/material';
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
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider';
import CartItem from '../cart/CartItem';
import axios from 'axios';
import Badge from '@mui/material/Badge';
import styled from '@mui/material/styles/styled';
import NavbarNotification from './notification/NavbarNotification';

function NavigationBarDesktop() {
    const { isAuthenticated } = useContext(AuthContext);

    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const profilePopoverOpen = Boolean(profileAnchorEl);

    const [cartAnchorEl, setCartAnchorElement] = useState(null);
    const cartPopoverOpen = Boolean(cartAnchorEl);

    const [notificationAnchorEl, setNotificationAnchorElemenet] = useState(null);
    const notificationPopoverOpen = Boolean(notificationAnchorEl);

    const [cartItemIds, setCartItemIds] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const [notifications, setNotifications] = useState([]);

    const onCartItemRemoved = (courseIdToDelete) => {
        const newCartItems = cartItemIds.filter(existingCartId => existingCartId !== courseIdToDelete);
        localStorage.setItem('cart', JSON.stringify(newCartItems));
        setCartItemIds(newCartItems);
    }

    const fetchNotifications = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        };

        axios.get('http://' + window.location.hostname + ':8080/api/v1/notification/unread', config)
            .then((response) => {
                setNotifications(response.data);
            })
    }

    useEffect(() => {
        if (isAuthenticated) {
            const interval = setInterval(() => {
                fetchNotifications();
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (notificationAnchorEl) {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            };

            axios.post('http://' + window.location.hostname + ':8080/api/v1/notification', {
                notificationIds: notifications.map(notification => notification.id)
            }, config)
                .then((response) => { })
                .catch(error => { });
        } else {
            // setNotifications([]);
        }
    }, [notificationAnchorEl, notifications]);


    useEffect(() => {
        if (cartAnchorEl) {
            setCartItemIds(JSON.parse(localStorage.getItem('cart') || '[]'));
        }
    }, [cartAnchorEl]);

    useEffect(() => {
        if (cartItemIds.length === 0) {
            setCartItems([]);
            return;
        }
        const fetchCartItems = async () => {
            const cartItems = await Promise.all(cartItemIds.map(async (cartItemId) => {
                const response = await fetch('http://' + window.location.hostname + `:8080/api/v1/course/${cartItemId}`);
                const course = await response.json();
                return course;
            }));
            setCartItems(cartItems);
        }
        fetchCartItems();
    }, [cartItemIds]);

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
                    <ShoppingCartIcon onClick={(event) => {
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
                        <StyledBadge color="material" badgeContent={notifications.length} max={10}>
                            <NotificationsIcon onClick={(event) => {
                                setNotificationAnchorElemenet(event.currentTarget);
                            }}></NotificationsIcon>
                        </StyledBadge>
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
                <ClickAwayListener onClickAway={() => setCartAnchorElement(null)}>
                    <div style={{ width: "325px" }}>
                        {cartItems.length === 0 ?
                            (<Typography style={{ width: "100%", textAlign: "center", marginTop: "15px", fontSize: "14px", color: "rgba(255, 255, 255, 0.5)" }}>Your cart is empty</Typography>) : <></>}
                        {cartItems.length > 0 ? cartItems.map((course, index) => {
                            return (<div style={{ marginTop: "8px" }}>
                                <CartItem size='small' item={course} onRemove={() => onCartItemRemoved(course.id)}></CartItem>
                            </div>)
                        }) : <></>}
                        <Divider style={{ marginTop: "15px" }}></Divider>
                        <Button disabled={cartItems.length === 0}
                            color='material'
                            style={{ width: "100%", textTransform: "none" }}
                            onClick={() => navigate('/order')}>View Cart</Button>
                    </div>
                </ClickAwayListener>
            </Popover>
            <Popover
                id={notificationPopoverOpen ? 'simple-popover' : undefined}
                open={notificationPopoverOpen}
                anchorEl={notificationAnchorEl}
                onClose={() => setNotificationAnchorElemenet(null)}
                style={{ marginTop: "15px" }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                <ClickAwayListener onClickAway={() => setNotificationAnchorElemenet(null)}>
                    <div style={{ width: "325px" }}>
                        {notifications.length === 0 ?
                            (<Typography style={{ width: "100%", textAlign: "center", marginTop: "15px", marginBottom: "15px", fontSize: "14px", color: "rgba(255, 255, 255, 0.5)" }}>You don't have any unread notification</Typography>) : <></>}
                        {notifications.length > 0 ? notifications.map((notification, index) => {
                            return (<div style={{ marginTop:"4px" }}>
                                <NavbarNotification notification={notification} />
                                <Divider style={{ marginTop: "4px" }}></Divider>
                            </div>);
                        }) : <></>}
                        <Divider></Divider>
                        <Button
                            color='material'
                            style={{ width: "100%", textTransform: "none" }}
                            onClick={() => navigate('/profile?tab=notifications')}>View All Notifications</Button>
                    </div>
                </ClickAwayListener>
            </Popover>
        </>
    );
}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        border: `2px solid #EC6652`,
        padding: '0 4px',
    },
}));

export default NavigationBarDesktop;