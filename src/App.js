import React, { useState } from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import "./App.css";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import { App } from "./App.1";

export const stripePromise = loadStripe("pk_test_51NKlNUIsqh3t9CjcoWoOS5FxfDeviMj1Dsq3qqYFYrU0lW1BZVXoPCk0PflWuxXUbxwcPzErUQKz1PMrYJbkxlm100wf3QiTZc");

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      // console.log(paymentMethod)
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout",
          {
            id,
            amount: 10000, //cents
          }
        );
        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  console.log(!stripe || loading);

  return (
    <div>
      <form className="card card-body" onSubmit={handleSubmit}>
        <h3 className="text-center my-2">Mueble para oficina basico</h3>
        <img
          src="https://todooficina.com/wp-content/uploads/2022/01/conjuntos_mobiliario_500x500.png"
          alt="Mueble"
          className="img-fluid"
        />
        <h3 className="text-center my-3">Price: 100$</h3>

        {/* User Card Input */}
        <div className="form-group">
          <CardElement />
          
        </div>

        <button disabled={!stripe} className="btn btn-success">
          {loading ? (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Buy"
          )}
        </button>

            

      </form>

    
    </div>
    
  );

  
};



export default App;
