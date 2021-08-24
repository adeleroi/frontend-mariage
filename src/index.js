import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppWithProviders from './App';
import reportWebVitals from './reportWebVitals';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// document.addEventListener('DOMContentLoaded', async () => {
//   const {publishableKey} = await fetch('/config').then((r) => r.json());
  const stripePromise = loadStripe("pk_test_dBcdfrU9L796gmsYfemRUozd00g7LiJ4CS");

  ReactDOM.render(
    <React.StrictMode>
      <Elements stripe={stripePromise}>
        <AppWithProviders />
      </Elements>
    </React.StrictMode>,
    document.getElementById('root')
  );
// });
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
