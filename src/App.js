import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';

import "bootswatch/dist/lux/bootstrap.min.css";
import './App.css';

const stripePromise = loadStripe("pk_test_51NKlNUIsqh3t9CjcoWoOS5FxfDeviMj1Dsq3qqYFYrU0lW1BZVXoPCk0PflWuxXUbxwcPzErUQKz1PMrYJbkxlm100wf3QiTZc")

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type:'card',
      card: elements.getElement(CardElement)
    })
    if(!error){
      const {id} = paymentMethod;

      const {data} = await axios.post('http://localhost:3001/api/checkout', {
        id,
        amount: 10000
      });
      console.log(data);
    }
  };

  return <form onSubmit={handleSubmit} className='card card-body '>

    <img src="https://todooficina.com/wp-content/uploads/2022/01/conjuntos_mobiliario_500x500.png" alt="mueble" className='img-fluid'/>

    <h3 className='text-center my-2'>Precio: $100</h3>
    <div className="form-group">
      <CardElement className='form-control'/>
    </div>
      <button className='btn btn-success'>Buy</button>
  </form>
}

function App() {
  return (
    <Elements stripe= {stripePromise}> 
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <CheckoutForm/>
          </div>
        </div>

      </div>

    </Elements>
  );
}

export default App;
