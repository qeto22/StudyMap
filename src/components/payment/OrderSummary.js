import React from 'react';
import './OrderSummary.css';
import { Divider, Typography } from '@mui/material';

const OrderSummary = ({ subtotal, serviceFee }) => {
  const grandTotal = subtotal + serviceFee;

  return (
    <div className="subtotal-container">
      <Typography style={{
        fontFamily: "cubano",
        fontSize: '20px',
        marginBottom: "15px"
      }}>Order Summary</Typography>

      <div className="subtotal-row">
        <span>Subtotal:</span>
        <span>{subtotal}$</span>
      </div>
      <div className="subtotal-row">
        <span>Service fee:</span>
        <span>{serviceFee}$</span>
      </div>
      <Divider style={{
        margin: "15px 0"
      }}></Divider>
      <div className="subtotal-row">
        <span>Grand total:</span>
        <span>{grandTotal}$</span>
      </div>
    </div>
  );
};

export default OrderSummary;
