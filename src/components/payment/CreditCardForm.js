import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputMask from 'react-input-mask'; // Import the library
import "./CreditCardForm.css";
import { Divider } from '@mui/material';

const CreditCardForm = () => {
    const [holderName, setHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleBuyClick = () => {
        // Handle the buy button click action here
        console.log('Buy button clicked');
        console.log('Holder Name:', holderName);
        console.log('Card Number:', cardNumber);
        console.log('Expiration Date:', expirationDate);
        console.log('CVV:', cvv);
    };

    return (
        <div className='credit-card-form'>
            <Typography style={{
                fontFamily: "cubano",
                fontSize: '20px',
                margin: "15px 20px"
            }}>Card Details</Typography>
            <Divider></Divider>
            <div style={{ padding: "5px 15px", width: "100%", marginTop: "5px" }}>
                <div className='input-group'>
                    <Typography style={{ marginBottom: '5px' }}>Card Holder</Typography>
                    <TextField
                        variant="outlined"
                        value={holderName}
                        size='small'
                        style={{ width: "90%" }}
                        placeholder='John Doe'
                        onChange={(e) => setHolderName(e.target.value)}
                    />
                </div>
                <div className='input-group'>
                    <Typography style={{ marginBottom: '5px' }}>Card Number</Typography>
                    <InputMask className={'card-number-input'}
                        mask="9 9 9 9   9 9 9 9   9 9 9 9   9 9 9 9" // Mastercard format
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    >
                        {() => (
                            <TextField className={'card-number-input'}
                                variant="outlined"
                                style={{ width: "90%" }}
                                size='small'
                                placeholder='1234 5678 9012 3456'
                            />
                        )}
                    </InputMask>
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ width: "100%" }}>
                        <Typography style={{ marginBottom: '5px' }}>Expiration Date</Typography>
                        <InputMask
                            mask="9 9 / 9 9" // Expiration date format
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                        >
                            {() => (
                                <TextField
                                    variant="outlined"
                                    size='small'
                                    placeholder='10 / 25'
                                    style={{ width: "81%" }}
                                />
                            )}
                        </InputMask>
                    </div>
                    <div style={{ width: "100%" }}>
                        <Typography style={{ marginBottom: '5px' }}>CVV</Typography>
                        <InputMask
                            mask="9 9 9" // CVV format
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                        >
                            {() => (
                                <TextField
                                    variant="outlined"
                                    size='small'
                                    placeholder='123'
                                    style={{ width: "81%" }}
                                />
                            )}
                        </InputMask>
                    </div>
                </div>
            </div>
            <div style={{ padding: "0px 15px" }}>
                <Button variant="contained" color='material' style={{ margin: '15px 0', width: "100%" }} onClick={handleBuyClick}>
                    Buy
                </Button>
            </div>
        </div>
    );
};

export default CreditCardForm;
