import { useNavigate } from 'react-router-dom';
import { Button, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchBar from './SearchBar';
import CategoriesButton from './CategoriesButton';

function NavigationBarDesktop() {
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
            <div className='navbar-item'>
                <Button onClick={handleLoginClick}
                    sx={{
                        width: "130px",
                        fontFamily: "cubano",
                        letterSpacing: "1px"
                    }} variant="outlined" >Log in</Button>
            </div>
            <div style={{ marginLeft: 10 }}>
                <Button onClick={handleSignupClick} sx={{
                    width: "130px",
                    fontFamily: "cubano",
                    letterSpacing: "1px"
                }} variant="contained" color="material">Sign Up</Button>
            </div>
            <div style={{ marginLeft: 10 }}>
                <Tooltip title="Light Mode">
                    <Button sx={{
                        width: "30px",
                        fontFamily: "cubano",
                        letterSpacing: "1px"
                    }} variant="outlined"><LightModeIcon></LightModeIcon></Button>
                </Tooltip>
            </div>
        </>
    );
}

export default NavigationBarDesktop;