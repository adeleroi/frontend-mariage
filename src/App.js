import './App.css';
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SaveTheDate from './views/save-the-date';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <SaveTheDate />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default function AppWithProviders() {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
  return (
    <Router>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Router>
  )
}
