import { Switch, Route, BrowserRouter } from 'react-router-dom';
import DeliveryList from './components/ListDelivery';
import DeliveryRegistration from './components/DeliveryRegistration';

function route() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <DeliveryList />
        </Route>
        <Route exact path="/deliveryRegistration">
          <DeliveryRegistration />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default route;
