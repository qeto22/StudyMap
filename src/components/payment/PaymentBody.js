import Cart from "../Cart/Cart";
import CreditCardForm from "./CreditCardForm";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";

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

    return (<div style={{justifyContent: 'flex-start !important', display: 'flex', width: 'fit-content', padding: '20px'}}>
        <div>
            <Cart initialCartItems={initialCartItems}></Cart>
            <PaymentMethod></PaymentMethod>
        </div>
        <OrderSummary subtotal={25} serviceFee={5}/>
        <CreditCardForm />

    </div>)
}

export default PaymentBody;