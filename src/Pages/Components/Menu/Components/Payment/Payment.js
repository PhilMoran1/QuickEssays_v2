import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment(props) {

  const [usrData, setUsrData] = useState('');
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data)
    if (data) {
      setUsrData(data);
    }
  }, []);
  
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const plan = props.plan;
  console.log(props.plan)
  useEffect(() => {
    fetch("http://localhost:3000/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {

    console.log(props);

    fetch("http://localhost:3000/create-payment-intent", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        purchaser: {user: usrData, plan: props.plan}
      })
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      console.log(clientSecret)
      setClientSecret(clientSecret);
    });
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