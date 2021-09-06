import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SaveTheDate from './views/save-the-date';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { Navbar } from './components/navbar';
import { Agenda } from './views/agenda';
import { Home } from './views/home';
import { Galerie } from './views/Galerie';
// import { Info } from './components/info';


function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Info /> */}
      <Switch>
      <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/save-the-date" exact>
          <SaveTheDate />
        </Route>
        <Route path="/agenda" exact>
          <Agenda />
        </Route>
        <Route path="/galerie" exact>
          <Galerie/>
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
