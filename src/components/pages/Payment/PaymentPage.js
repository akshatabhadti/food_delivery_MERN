import React, { useState, useEffect } from 'react';
import classes from './paymentPage.module.css';
import { getNewOrderForCurrentUser } from '../../../services/orderService';
import Title from '../../Title/Title';
import Map from '../../Map/Map';
import OrderItemsList from '../../OrderItemsList/OrderItemsList';
//import Button from '../../Button/Button';
import { Link } from 'react-router-dom';
import Button from '../../Button/Button';
import OrdersPage from '../Orders/OrdersPage';
import { useCart } from '../../../hooks/useCart';
//import OrdersPage from '../Orders/OrdersPage';
//import PaypalButtons from '../../components/PaypalButtons/PaypalButtons';

export default function PaymentPage() {
  const [order, setOrder] = useState();
  const [error, setError] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    getNewOrderForCurrentUser()
      .then(data => setOrder(data))
      .catch(error => setError(error));
  }, []);

  /*useEffect(() => {
    getNewOrderForCurrentUser().then(data => setOrder(data));
  }, []);
*/
if (error) {
  // Handle error state
  return <PaymentPage/>
}

if (!order) {
  // Handle loading state
  return <div>Loading...</div>;
}
 // if (!order) return;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.summary}>
            <div>
              <h3>Name:</h3>
              <span>{order.name}</span>
            </div>
            <div>
              <h3>Address:</h3>
              <span>{order.address}</span>
            </div>
          </div>
          <OrderItemsList order={order} />
        </div>

        <div className={classes.map}>
          <Title title="Your Location" fontSize="1.6rem" />
          <Map readonly={true} location={order.addressLatLng} />
        </div>

        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
          <Link to="/track">
              <Button>Confirm Delivery</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
/*<Button
              type="submit"
              text="Confirm Delivery"
              width="100%"
              height="3rem"
              />*/