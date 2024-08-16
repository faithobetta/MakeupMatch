/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import '../CSS-pages/PaymentPage.css';
import VisaLogo from './Visalogo.svg';
import MasterCard_Logo from './MasterCard_Logo.svg';
import Amexlogo from './Amexlogo.svg';

// Make sure to replace this with your own public key
const stripePromise = loadStripe('pk_test_51PeoilRxmDLqCrWRI3h4mcpC8YUhq70HjJy3fDLvrNLt6znAkTu19MVjPaxg0I8r8fQ59wmlgLU4I8uMSTsV38ce00hMCd0nmK');

const CheckoutForm = ({ totalAmount, currency, selectedCardType }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.error(error);
            // Handle error
        } else {
            navigate("/success")
            // Handle successful payment
            console.log('Payment Method:', paymentMethod);
            // You can send the paymentMethod.id and totalAmount to your server to complete the payment
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Payment</h2>
            <div className="selected-card-type">
                {selectedCardType && <img src={selectedCardType} alt="Selected card logo" />}
            </div>
            <div className="card-element">
                <CardElement />
            </div>
            <div className="payment-details">
                <p>Total Amount: {totalAmount} {currency}</p>
            </div>
            <button type="submit" disabled={!stripe}>Pay Now</button>
        </form>
    );
};

const PaymentPage = () => {
    const location = useLocation();
    const { totalAmount, currency } = location.state || {};
    const [selectedCardType, setSelectedCardType] = useState(null);
    const cardTypes = [
        { type: 'visa', name: 'Visa', logo: VisaLogo },
        { type: 'mastercard', name: 'MasterCard', logo: MasterCard_Logo },
        { type: 'amex', name: 'Amex', logo: Amexlogo },
    ];

    return (
        <div className="payment-page">
            <h2>Select Card Type</h2>
            <div className="card-types">
                {cardTypes.map(card => (
                    <img
                        key={card.type}
                        src={card.logo}
                        alt={card.name}
                        className={`card-type ${selectedCardType === card.logo ? 'selected' : ''}`}
                        onClick={() => setSelectedCardType(card.logo)}
                    />
                ))}
            </div>
            {totalAmount && currency ? (
                <Elements stripe={stripePromise}>
                    <CheckoutForm totalAmount={totalAmount} currency={currency} selectedCardType={selectedCardType} />
                </Elements>
            ) : (
                <div>No payment details found.</div>
            )}
        </div>
    );
};

export default PaymentPage;