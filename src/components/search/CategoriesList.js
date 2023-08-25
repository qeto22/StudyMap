import { ListItemIcon, ListItemText, List, ListItem, ListItemButton } from "@mui/material";
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
import { useLocation, useNavigate } from "react-router-dom";

const categories = [
    { name: 'Development', icon: <CodeIcon color="primary" fontSize="small" /> },
    { name: 'Business', icon: <WorkIcon color="primary" fontSize="small" /> },
    { name: 'Finance & Accounting', icon: <AccountBalanceIcon color="primary" fontSize="small" /> },
    { name: 'IT & Software', icon: <CloudIcon color="primary" fontSize="small" /> },
    { name: 'Office Productivity', icon: <HomeWorkIcon color="primary" fontSize="small" /> },
    { name: 'Personal Development', icon: <SettingsAccessibilityIcon color="primary" fontSize="small" /> },
    { name: 'Design', icon: <BrushIcon color="primary" fontSize="small" /> },
    { name: 'Marketing', icon: <CampaignIcon color="primary" fontSize="small" /> },
    { name: 'Lifestyle', icon: <FitnessCenterIcon color="primary" fontSize="small" /> },
    { name: 'Photography & Video', icon: <CameraEnhanceIcon color="primary" fontSize="small" /> },
    { name: 'Music', icon: <LibraryMusicIcon color="primary" fontSize="small" /> }
];

function CategoriesList() {
    const navigate = useNavigate();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const currentCategory = params.get('category');

    const onCategoryClick = (category) => {
        navigate('/search?category=' + encodeURIComponent(category));
    }

    return (
        <List>
            {categories.map((category) => (
                <ListItem key={category.name} disablePadding>
                    <ListItemButton onClick={() => onCategoryClick(category.name)} selected={category.name === currentCategory}>
                        <ListItemIcon>
                            {category.icon}
                        </ListItemIcon>
                        <ListItemText>{category.name}</ListItemText>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}

export default CategoriesList;
export { categories };