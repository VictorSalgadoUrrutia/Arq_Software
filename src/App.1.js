import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise, CheckoutForm } from "./App";

export function App() {
  return (

   

    <Elements stripe={stripePromise}>

<nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Espacio Funcional</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">Productos</a>
          </li>
          
          <li className="nav-item">
            <a className="nav-link" href="/contacto">Contacto</a>
          </li>
        </ul>
      </div>
    </nav>

      <div className="container p-4">
        <div className="row h-100">
          <div className="col-md-4 offset-md-4 h-100">
            <CheckoutForm />
          </div>
        </div>
      </div>

      


      <footer className="footer mt-auto py-3">
        <div className="container text-center">
          <span className="text-muted">© 2022 Tu Aplicación. Todos los derechos reservados.</span>
        </div>
      </footer>


    </Elements>

    


  );
}
