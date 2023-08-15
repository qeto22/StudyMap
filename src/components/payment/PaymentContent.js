import { Container, Grid } from "@mui/material";
import Footer from "../footer/Footer";
import NavigationBar from "../navbar/NavigationBar";
import PaymentBody from "./PaymentBody";

function PaymentContent() {
    return (
        <div>
            <NavigationBar />
            <Container maxWidth='lg'>
                <Grid container>
                    <Grid item md={7.5}>
                        <PaymentBody></PaymentBody>
                    </Grid>
                    <Grid item md={0.5}></Grid>
                    <Grid item md={4.5}>
                        Other stuff goes here!
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    )
}

export default PaymentContent;