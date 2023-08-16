import CreditCardForm from "./CreditCardForm";
import PaymentMethod from "./PaymentMethod";

function PaymentBody() {
    return (<div style={{justifyContent: 'center'}}>
        <PaymentMethod></PaymentMethod>
        <CreditCardForm/>
    </div>)
}

export default PaymentBody;