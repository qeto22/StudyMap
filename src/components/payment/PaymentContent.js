import Footer from "../footer/Footer";
import NavigationBar from "../navbar/NavigationBar";
import PaymentBody from "./PaymentBody";

function PaymentContent() {
    return (
        <div>
            <NavigationBar />
            <PaymentBody></PaymentBody>
            <Footer />
        </div>
    )
}

export default PaymentContent;