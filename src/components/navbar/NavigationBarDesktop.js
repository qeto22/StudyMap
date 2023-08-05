import { useNavigate } from 'react-router-dom';
import { Button, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBar from './SearchBar';
import CategoriesButton from './CategoriesButton';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';

function NavigationBarDesktop() {
    const { isAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate("/signup")
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
                    <AccountCircleIcon style={{
                        fontSize: "32px"
                    }}></AccountCircleIcon>
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