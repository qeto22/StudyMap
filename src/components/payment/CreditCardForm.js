import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputMask from 'react-input-mask'; // Import the library
import "./CreditCardForm.css";

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
        <div className="credit-card-form">
            <div className='input-group'>
                <Typography variant="subtitle1">Holder Name</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={holderName}
                    onChange={(e) => setHolderName(e.target.value)}
                />
            </div>
            <div className='input-group'>
                <Typography variant="subtitle1">Card Number</Typography>
                <InputMask className={'card-number-input'}
                    mask="9  9  9  9   9  9  9  9   9  9  9  9   9  9  9  9" // Mastercard format
                    value={cardNumber}

                    onChange={(e) => setCardNumber(e.target.value)}
                >
                    {() => (
                        <TextField className={'card-number-input'}
                            variant="outlined"
                            fullWidth
                            
                        />
                    )}
                </InputMask>
            </div>
            <div className="input-group details">
                <div>
                    <Typography variant="subtitle1">Expiration Date</Typography>
                    <InputMask
                        mask="9 9    /    9 9" // Expiration date format
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                    >
                        {() => (
                            <TextField
                                variant="outlined"
                            />
                        )}
                    </InputMask>
                </div>
                <div>
                    <Typography variant="subtitle1">CVV</Typography>
                    <InputMask
                        mask="9   9   9" // CVV format
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                    >
                        {() => (
                            <TextField
                                variant="outlined"
                            />
                        )}
                    </InputMask>
                </div>
            </div>
            <Button variant="contained" style={{ backgroundColor: 'rgb(236, 102, 82)', marginTop: '10px', color: 'white' }} onClick={handleBuyClick}>
                Buy
            </Button>
        </div>
    );
};

export default CreditCardForm;
