import { Box, Container, Grid, Hidden, MenuItem, Select, useMediaQuery } from "@mui/material";
import { useState } from "react";
import SearchFilters from "./SearchFilters";
import SearchResults from "./SearchResults";

function SearchBody() {
    const [sortBy, setSortBy] = useState('most-popular');
    
    
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));

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
            <Grid container style={{ marginTop: "20px" }}>
                <Hidden lgDown>
                    <Grid item xs={2.5}>
                        <SearchFilters />
                    </Grid>
                </Hidden>

                <Grid item xs={0.5}></Grid>

                <Grid item xs={!isLargeScreen ? 12 : 9}>
                    <SearchResults />
                </Grid>
            </Grid>
        </Container>
    )
}

export default SearchBody;