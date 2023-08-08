import { Grid, InputAdornment, TextField } from "@mui/material";

function AmountRange() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Min Price"
                    variant="outlined"
                    type="number"
                    defaultValue={0}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><span style={{ color: "white" }}>$</span></InputAdornment>
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Max Price"
                    variant="outlined"
                    type="number"
                    defaultValue={10000}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><span style={{ color: "white" }}>$</span></InputAdornment>
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default AmountRange;