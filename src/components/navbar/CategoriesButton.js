import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CloudIcon from '@mui/icons-material/Cloud';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import BrushIcon from '@mui/icons-material/Brush';
import CampaignIcon from '@mui/icons-material/Campaign';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { escape } from "lodash";

function CategoriesButton() {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onCategorySelected = (category) => {
        navigate("/search?category=" + encodeURIComponent(category));
    }

    return (<div>
        <Button id="categories-btn"
            sx={{ fontFamily: "cubano" }}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>Categories <ArrowDropDownIcon></ArrowDropDownIcon></Button>

        <Menu
            id="categories-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'categories-btn',
            }}
        >
            <MenuItem onClick={() => onCategorySelected('Development')}>
                <ListItemIcon>
                    <CodeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Development</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => onCategorySelected('Business')}>
                <ListItemIcon>
                    <WorkIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Business</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => onCategorySelected('Finance & Accounting')}>
                <ListItemIcon>
                    <AccountBalanceIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Finance & Accounting</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => onCategorySelected('IT & Software')}>
                <ListItemIcon>
                    <CloudIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>IT & Software</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => onCategorySelected('Office Productivity')}>
                <ListItemIcon>
                    <HomeWorkIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Office Productivity</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => onCategorySelected('Personal Development')}>
                <ListItemIcon>
                    <SettingsAccessibilityIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Personal Development</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => onCategorySelected('Design')}>
                <ListItemIcon>
                    <BrushIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Design</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => onCategorySelected('Marketing')}>
                <ListItemIcon>
                    <CampaignIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Marketing</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => onCategorySelected('Lifestyle')}>
                <ListItemIcon>
                    <FitnessCenterIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Lifestyle</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => onCategorySelected('Photography & Video')}>
                <ListItemIcon>
                    <CameraEnhanceIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Photography & Video</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => onCategorySelected('Music')}>
                <ListItemIcon>
                    <LibraryMusicIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Music</ListItemText>
            </MenuItem>
        </Menu>
    </div>)
}

export default CategoriesButton;