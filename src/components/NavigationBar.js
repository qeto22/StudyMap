import { Button, Container, Tooltip } from '@mui/material';
import './NavigationBar.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchBar from './SearchBar';

function NavigationBar() {
    return (<Container maxWidth='xl'>
                <div className='navbar-wrapper'>
                    <img src='https://fireship.io/img/logo.svg' alt='Logo' className='navbar-icon'></img>
                    <h2 className='company-title'>StudyMap</h2>
                    <span className='navbar-item'>Categories <ArrowDropDownIcon></ArrowDropDownIcon></span>
                    <SearchBar width={680} marginLeft={5} />
                    <span className='navbar-item'>
                        <Tooltip title="Cart">
                            <ShoppingCartIcon></ShoppingCartIcon>
                        </Tooltip>
                    </span>
                    <div className='navbar-item'>
                        <Button sx={{
                            width: "130px",
                            fontFamily: "cubano",
                            letterSpacing: "1px"
                        }} variant="outlined" >Log in</Button>
                    </div>
                    <div style={{marginLeft: 10}}>
                        <Button sx={{
                            width: "130px",
                            fontFamily: "cubano",
                            letterSpacing: "1px"
                        }} variant="contained" color="material">Sign Up</Button>
                    </div>
                    <div style={{marginLeft: 10}}>
                        <Tooltip title="Light Mode">
                            <Button sx={{
                                width: "30px",
                                fontFamily: "cubano",
                                letterSpacing: "1px"
                            }} variant="outlined"><LightModeIcon></LightModeIcon></Button>
                        </Tooltip>
                    </div>
                </div>
            </Container>)
}

export default NavigationBar;