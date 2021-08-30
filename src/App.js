import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SaveTheDate from './views/save-the-date';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { Navbar } from './components/navbar';
import { Agenda } from './views/agenda';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/save-the-date" exact>
          <SaveTheDate />
        </Route>
        <Route path="/agenda" exact>
          <Agenda />
        </Route>
      </Switch>
    </div>
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
