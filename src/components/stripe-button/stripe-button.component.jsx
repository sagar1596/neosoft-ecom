import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => { 
    const priceForStripe = price * 100; // Stripe price is in cents, so the * 100
    const publishableKey = 'pk_test_51GrMbAA43bz1MJhBXJmf3FZ5u08NR2UwV8ejvtcmzIyE8CocNSpEHhhephlihUGZqnuQzfEAbEjjpV6KuKxXJMzF00DwD1j00S';

    const onToken = token => {
        console.log(token);
        alert("Payment Successful");
    }

    // Stripe checkout Component URL : https://github.com/azmenak/react-stripe-checkout
    return (
        <StripeCheckout 
            label="Pay Now"
            name="NEOSOFT ECOM"
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
            />
    )
}

export default StripeCheckoutButton;