import React, { useEffect, useState, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createOrder, getAllStatus } from '../../../services/orderService';
import { useCart } from '../../../hooks/useCart';
import classes from './ordersPage.module.css';
import Title from '../../Title/Title';
import DateTime from '../../DateTime/DateTime';
import Price from '../../Price/Price';
import OrderItemsList from '../../OrderItemsList/OrderItemsList';

const initialState = {};
const reducer = (state, action) => {
  const { type, order } = action;
  switch (type) {
    case 'ALL_STATUS_FETCHED':
      return { ...state, allStatus: action.payload };
    case 'ORDER_PLACED':
      return { ...state, orderPlaced: order };
    default:
      return state;
  }
};

export default function OrdersPage() {
  const { cart } = useCart();
  const [order, setOrder] = useState({ ...cart });
  const [{ allStatus, orderPlaced }, dispatch] = useReducer(reducer, initialState);
  const { filter } = useParams();
  const [currentStatus, setCurrentStatus] = useState('Shipped');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    getAllStatus().then(status => {
      dispatch({ type: 'ALL_STATUS_FETCHED', payload: status });
    });
  }, []);

  const placeOrder = () => {
    createOrder(selectedItems).then(order => {
      dispatch({ type: 'ORDER_PLACED', order });
    });
  };

  const handleTabChange = (status) => {
    setCurrentStatus(status);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStatus === 'Shipped') {
        setCurrentStatus('Out for Delivery');
      } 
      else if (currentStatus === 'Out for Delivery') {
        setCurrentStatus('Almost there');
      }
      else if (currentStatus === 'Almost there') {
        setCurrentStatus('Delivered');
      }
    }, 10000); // Change status every 10 seconds

    return () => clearInterval(interval);
  }, [currentStatus]);

  // Function to determine progress bar color
  const getProgressBarColor = () => {
    switch (currentStatus) {
      case 'Shipped':
        return '#2196f3'; // Green color
      case 'Out for Delivery':
        return '#ff9800'; // Orange color
      case 'Almost there':
          return '#FF0000';  //red
      case 'Delivered':
        return '#4caf50'; // Blue color
        
      default:
        return '#ccc'; // Default color
    }
  };

  // Function to get status message based on currentStatus
  const getStatusMessage = () => {
    switch (currentStatus) {
      case 'Shipped':
        return 'Order confirmed';
      case 'Out for Delivery':
        return 'Order shipped';
      case 'Almost there':
        return 'Thank you for ordering...Almost there';
      case 'Delivered':
          return 'Superfast Delivery!';  
      default:
        return '';
    }
  };

  return (
    <div className={classes.container}>
      <h2>Thankyou for Ordering!</h2>
      <p>Your order will be delivered to you shortly. Check the Status below.</p>
      <Title title="Order Info" margin="1.5rem 0 0 .2rem" fontSize="1.9rem" />
      <OrderItemsList order={order} />

      
      <div className={classes.progress_bar}>
        <p>{getStatusMessage()}</p>
        <div className={classes.progress}>
          <div
            className={classes.progressBar}
            style={{ width: currentStatus === 'Shipped' ? '33%' : currentStatus === 'Out for Delivery' ? '66%' : '100%', backgroundColor: getProgressBarColor() }}
          ></div>
        </div>
      </div>

      
    </div>
  );
}

/*<div className={classes.all_status}>
        {allStatus && allStatus.map(status => (
          <button
            key={status}
            className={currentStatus === status ? classes.selected : ''}
            onClick={() => handleTabChange(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {orderPlaced && (
        <div className={classes.order_summary}>
          <div className={classes.header}>
            <span>{orderPlaced.id}</span>
            <span>
              <DateTime date={orderPlaced.createdAt} />
            </span>
            <span>{orderPlaced.status}</span>
          </div>
          <div className={classes.items}>
            {orderPlaced.selectedItems.map(item => (
              <div key={item.name}>
                <span>{item.name}</span>
                <span>Price: {item.price}</span>
                <span>Quantity: {item.quantity}</span>
              </div>
            ))}
          </div>
          <div className={classes.footer}>
            <div>
              <Link to={`/track/${orderPlaced.id}`}>Show Order</Link>
            </div>
            <div>
              <span className={classes.price}>
                <Price price={orderPlaced.totalPrice} />
              </span>
            </div>
          </div>
        </div>
      )}
*/
