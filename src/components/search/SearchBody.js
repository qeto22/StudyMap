import { Box, Container, Grid, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import SearchFilters from "./SearchFilters";

function SearchBody() {
    const [sortBy, setSortBy] = useState('most-popular');

    return (
        <Container maxWidth="xl" style={{ marginTop: "30px", marginBottom: "30px" }}>
            <Box display="flex" justifyContent="flex-end">
                <Select style={{
                    width: "150px"
                }} size="small" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                    <MenuItem value={'most-popular'}>Most Popular</MenuItem>
                    <MenuItem value={'newest'}>Newest</MenuItem>
                    <MenuItem value={'oldest'}>Oldest</MenuItem>
                </Select>
            </Box>
            <Grid container>
                <Grid item md={2.5}>
                    <SearchFilters />
                </Grid>
                <Grid item md={0.5}></Grid>
                <Grid item md={9}>
                    Test
                </Grid>
            </Grid>
        </Container>
    )
}

export default SearchBody;