import { Button, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router";

function AddGridItem() {
    const navigate = useNavigate();

    return (<Button onClick={() => navigate('/map/create')} style={{ width: "100%", height: "100%", display: "flex", gap: "5px" }} variant="outlined" color="material">
        <AddIcon fontSize="small" /><Typography sx={{ fontSize: "14px", textTransform: "none" }} >Add new StudyMap</Typography>
    </Button>)
}

export default AddGridItem;