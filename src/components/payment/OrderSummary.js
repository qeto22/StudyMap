import React from 'react';

const OrderSummary = ({ subtotal, serviceFee }) => {
  const grandTotal = subtotal + serviceFee;

  return (
    <div className="subtotal-container">
      <h2>Order Summary</h2>
      <div className="subtotal-row">
        <span>Subtotal:</span>
        <span>{subtotal}$</span>
      </div>
      <div className="subtotal-row">
        <span>Service fee:</span>
        <span>{serviceFee}$</span>
      </div>
      <hr />
      <div className="subtotal-row">
        <span>Grand total:</span>
        <span>{grandTotal}$</span>
      </div>
    </div>
  );
};

export default OrderSummary;
