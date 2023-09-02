import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputMask from 'react-input-mask'; // Import the library
import "./CreditCardForm.css";
import { Alert, AlertTitle, Divider, Snackbar } from '@mui/material';
import axios from 'axios';

const CreditCardForm = ({ cartItemIds }) => {
    const [holderName, setHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');

    const [buyingResult, setBuyingResult] = useState(null);

    const handleBuyClick = () => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.post("http://" + window.location.hostname + ":8080/api/v1/payment", {
            courseIds: cartItemIds,
            cardHolder: holderName,
            cardNumber: cardNumber,
            expirationDate: expirationDate,
            cvv: cvv
        }, config)
            .then((response) => {
                if (response.status !== 200) {
                    setBuyingResult({
                        success: false,
                        message: 'Error occurred buying courses. Please try again later.'
                    });
                    return;
                }
                localStorage.removeItem('cart');
                setBuyingResult({
                    success: true,
                    message: 'Courses bought successfully.'
                });
            })
            .catch((error) => {
                setBuyingResult({
                    success: false,
                    message: 'Error occurred buying courses. Please try again later.'
                });
            });
    };

    const onSnackbarClose = () => {
        window.location.reload();
    }

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
                        mask="9 9 9 9   9 9 9 9   9 9 9 9   9 9 9 9"
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
            <Snackbar open={buyingResult != null} autoHideDuration={2000} onClose={onSnackbarClose}>
                <Alert severity={buyingResult != null && buyingResult.success ? 'success' : 'error'} variant='filled' style={{ color: 'white' }}>
                    <AlertTitle>{buyingResult != null && buyingResult.success ? 'Success' : 'Error'}</AlertTitle>
                    {buyingResult != null ? buyingResult.message : ''}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CreditCardForm;
