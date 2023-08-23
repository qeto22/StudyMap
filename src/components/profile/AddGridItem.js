import { Button, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function AddGridItem({ label, onClick }) {

    return (<Button onClick={() => onClick()} style={{ width: "100%", height: "100%", minHeight: "150px", display: "flex", gap: "5px" }} variant="outlined" color="material">
        <AddIcon fontSize="small" /><Typography sx={{ fontSize: "14px", textTransform: "none" }} >{label}</Typography>
    </Button>)
}

export default AddGridItem;