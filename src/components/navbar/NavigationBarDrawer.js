import { Button, Drawer, List, ListItem } from '@mui/material';
import CategoriesButton from './CategoriesButton';
import { useNavigate } from 'react-router-dom';

function NavigationBarDrawer({ open, handleDrawerToggle }) {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate("/signup")
    }

    return (
        <Drawer
            variant="temporary"
            anchor='right'
            open={open}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true,
            }}
        >
            <div className='navbar-drawer'>
                <List>
                    <ListItem>
                        <Button onClick={handleLoginClick} sx={{
                            width: "100%",
                            fontFamily: "cubano",
                            letterSpacing: "1px"
                        }} variant="outlined" >Log in</Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={handleSignupClick} sx={{
                            width: "100%",
                            fontFamily: "cubano",
                            letterSpacing: "1px",
                            marginBottom: "15px"
                        }} variant="contained" color="material">Sign Up</Button>
                    </ListItem>
                    <ListItem>
                        <CategoriesButton />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
}

export default NavigationBarDrawer;