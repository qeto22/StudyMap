import { Container, Grid } from "@mui/material";
import Typed from 'react-typed';

function WelcomeContent() {
    return (
        <Container maxWidth="xl" style={{marginTop: '50px'}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <span>LEARN TO <Typed /></span>
                </Grid>
                <Grid item xs={6}>
                    Test
                </Grid>
            </Grid>
        </Container>
    )
}

export default WelcomeContent;