import { Container } from "@mui/system";
import Cart from "../Cart/Cart";
import CreditCardForm from "./CreditCardForm";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";
import { Grid, Typography } from "@mui/material";

function PaymentBody() {

    const initialCartItems = [
        // Your cart items data here
        {
            image: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png',
            title: 'Path to Google',
            author: 'Keti Bachalashvili',
            rating: 4.5,
            price: '29.99',
        },

        {
            image: 'https://www.freepnglogos.com/uploads/javascript-png/javascript-logo-transparent-logo-javascript-images-3.png',
            title: '2 Weeks of Javascript',
            author: 'Nani Balakhadze',
            rating: 4.5,
            price: '60.00',
        },
        {
            image: 'https://www.freepnglogos.com/uploads/javascript-png/javascript-logo-transparent-logo-javascript-images-3.png',
            title: '2 Weeks of Javascript',
            author: 'Nani Balakhadze',
            rating: 4.5,
            price: '60.00',
        },
        {
            image: 'https://www.freepnglogos.com/uploads/javascript-png/javascript-logo-transparent-logo-javascript-images-3.png',
            title: '2 Weeks of Javascript',
            author: 'Nani Balakhadze',
            rating: 4.5,
            price: '60.00',
        },
        {
            image: 'https://www.freepnglogos.com/uploads/javascript-png/javascript-logo-transparent-logo-javascript-images-3.png',
            title: '2 Weeks of Javascript',
            author: 'Nani Balakhadze',
            rating: 4.5,
            price: '60.00',
        },
        // ... other cart items
    ];


    //     <div>
    //     <Cart initialCartItems={initialCartItems}></Cart>
    //     <PaymentMethod></PaymentMethod>
    // </div>
    // <OrderSummary subtotal={25} serviceFee={5}/>
    // <CreditCardForm />


    return (<Container maxWidth="lg" style={{
        // backgroundColor: "red",
        margin: "25px auto"
    }}>
        <Typography variant="h6">Billing & Payment</Typography>
        <Grid container style={{ border: "1px solid rgba(255, 255, 255, 0.4)", borderRadius: "6px", padding: "30px", marginTop: "20px" }}>
            <Grid item md={8.25}>
                <Cart initialCartItems={initialCartItems}></Cart>
                <PaymentMethod></PaymentMethod>
            </Grid>
            <Grid item md={0.5}>
            </Grid>
            <Grid item md={3.25}>
                <OrderSummary subtotal={25} serviceFee={5} />
                <CreditCardForm />
            </Grid>
        </Grid>
    </Container>)
}

export default PaymentBody;