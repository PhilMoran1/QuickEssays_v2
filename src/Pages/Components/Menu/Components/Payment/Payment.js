import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

import { getConfig, createPaymentIntent } from "../../../fetch.mjs";
function Payment(props) {

  const [usrData, setUsrData] = useState('');
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      setUsrData(data);
    }
  }, []);
  
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {

    getConfig(usrData).then((result) => {
      setStripePromise(loadStripe(result));
    }).catch((error) => { console.log("Couldnt fetch publishable key - ", error)})
    
  }, []);

  useEffect(() => {
    createPaymentIntent(usrData, props.plan).then((result) => {
      setClientSecret(result)
    }).catch((error) => { console.log("Couldnt create Payment Intent - " , error)})
  }, [usrData]);

  return (
    <>
      <h1>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm plan={props.plan} />
        </Elements>
      )}
    </>
  );
}

export default Payment;