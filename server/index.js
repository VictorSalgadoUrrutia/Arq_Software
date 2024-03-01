const express = require("express");
const Stripe = require("stripe");

const stripe = new Stripe("sk_test_51NKlNUIsqh3t9CjccPOwIltepEn0L3WFNcveYJAtRa9Dl397OPCMTQALsdTuReHgGkcwuSi55vF8tD9Fh25ckMbZ00oJwA1RsN")

const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  // you can get more data to find in a database, and so on
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Gaming Keyboard",
      payment_method: id,
      confirm: true, //confirm the payment at the same time
    });

    console.log(payment);

    return res.status(200).json({ message: "Successful Payment" });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.raw.message });
  }
});

app.listen(3001, () => {
  console.log("Server on port", 3001);
});


// const express = require('express');
// const Stripe = require('stripe');
// const cors = require('cors');

// const app = express();

// const stripe = new Stripe("sk_test_51NKlNUIsqh3t9CjccPOwIltepEn0L3WFNcveYJAtRa9Dl397OPCMTQALsdTuReHgGkcwuSi55vF8tD9Fh25ckMbZ00oJwA1RsN")

// app.use(cors({origin: 'http://localhost:3000'}));

// app.use(express.json());

// app.post('/api/checkout', async (req, res) => {

//     try {
//         const {id, amount} = req.body;
//     const payment = await stripe.paymentIntents.create({
//         amount,
//         currency: 'USD',
//         description: 'mueble',
//         payment_method: id,
//         confirm: true
//     });
//     console.log(payment);
//     res.send({message: 'Successful Payment'});
    
//     } catch (error) {
//         console.log(error);
//         res.json({message: error});
//     }



// });

// app.listen(3001, () => {
//   console.log('Server on port', 3001);
// });



