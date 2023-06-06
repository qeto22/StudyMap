import { Container, Grid } from "@mui/material";

function WelcomeBody() {
    return (
        <Container maxWidth="xl" style={{marginTop: '50px'}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <span>LEARN TO</span>
                </Grid>
                <Grid item xs={6}>
                    Test
                </Grid>
            </Grid>
        </Container>
    )
}

export default WelcomeBody;