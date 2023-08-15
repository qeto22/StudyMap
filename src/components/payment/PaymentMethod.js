import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import "./PaymentMethod.css";
import Checkbox from '@mui/material/Checkbox';
import CircleCheckedFilled from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';

function PaymentMethod() {
    const paymentMethods = [
        { id: 1, name: 'Visa', logoUrl: 'https://www.freepnglogos.com/uploads/visa-card-logo-9.png' },
        { id: 2, name: 'Mastercard', logoUrl: 'https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-png-transparent-svg-vector-bie-supply-1.png' },
        { id: 3, name: 'paypal', logoUrl: 'https://www.freepnglogos.com/uploads/paypal-logo-png-8.png' },

        // Add more payment methods here
    ];

    const [selectedMethod, setSelectedMethod] = useState(null);

    const handleMethodSelect = (methodId) => {
        setSelectedMethod(methodId);
    };

    return (<div>
        <div style={{
            width: "100%",
            border: '1px solid white',
            borderRadius: '10px',
            justifyContent: 'center',
            margin: '30px',
            display: 'table'
        }}>
            <Typography style={{
                margin: '10px 40px',
                marginBottom: '40px',
                fontSize: '20px',
                fontFamily: 'cubano',
                textAlign: 'center'
            }}>Choose payment method</Typography>
            <Grid container className={'payment-method-div'}>
                {paymentMethods.map((method) => (
                    <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', height: "60px" }}
                        key={method.id}
                        className={`payment-method ${selectedMethod === method.id ? 'selected' : ''}`}
                        onClick={() => handleMethodSelect(method.id)}
                    >
                        <img src={method.logoUrl} alt={method.name} />
                    </Grid>
                ))}
            </Grid>

        </div>
    </div>)
}

export default PaymentMethod;