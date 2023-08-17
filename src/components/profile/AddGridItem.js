import { Button, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function AddGridItem() {
    return (<Button style={{ width: "100%", height: "100%", display: "flex", gap: "5px" }} variant="outlined" color="material">
        <AddIcon fontSize="small" /><Typography sx={{ fontSize: "14px", textTransform: "none" }} >Add new StudyMap</Typography>
    </Button>)
}

export default AddGridItem;