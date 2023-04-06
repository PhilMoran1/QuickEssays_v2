import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Alert, Text, Flex } from "@chakra-ui/react";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);
    
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required"

    });

    if (error) {
        setMessage({status: "error", message: error.message})

    } else if (paymentIntent && paymentIntent.status === "succeeded") { 
        setMessage({status: "success", message: "Payment status: " + paymentIntent.status})
        // Wait for 2 seconds before reloading the page
        setTimeout(() => {
          window.location.reload();
        }, 10000);
    }
    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Text
        fontSize={"150%"}
      >
        Total: {props.plan.price}
      </Text>
      <Flex justifyContent="center">

      <Button
        disabled={isProcessing || !stripe || !elements}
        colorScheme="blue"
        mt={4}
        type="submit"
      >
        {isProcessing ? "Processing ..." : "Pay now"} 
      </Button>
      </Flex>
      {/* Show any error or success messages */}
      {message && (
        <Alert status={message.status} mt={4}>
          {message.message} 
        </Alert>
      )}
    </form>
  );
}
