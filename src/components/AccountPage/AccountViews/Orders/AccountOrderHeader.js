import { useState, useEffect } from 'react';

const AccountOrderHeader = ({ order }) => {
  const [isDelivered, setIsDelivered] = useState(false);

  useEffect(() => {
    const setDeliveryStatus = () => {
      if (order.orderDate + 4.32e+8 <= Date.now()) {
        setIsDelivered(true);
      }
    }
    setDeliveryStatus();
  }, [order.orderDate]);

  const deliveryDate = order.orderDate + 4.32e+8; /* 5 days after the order date */
  const formatDate = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const fullDate = new Date(date);
    const day = fullDate.getDay();
    const dateNumber = fullDate.getDate();
    const month = fullDate.getMonth();
    const year = fullDate.getFullYear();

    return `${days[day]} ${dateNumber} ${months[month]} ${year}`;
  }

  return (
    <div className="account__order--header">
      <div className="account__order--delivery-status">
        <h4 className="account__order--delivery-status-heading">
          {isDelivered ? "Your Order has been delivered!" : "Your Order is on it's way!"}  
        </h4>
      </div>
      <div className="account__order--order-date-wrapper account__order--wrapper">
        <span className="account__order--order-date-label account__order--label">Order Date: </span>
        <span className="account__order--order-date account__order--value">{formatDate(order.orderDate)}</span>
      </div>
      <div className="account__order--delivery-date-wrapper account__order--wrapper">
        <span className="account__order--delivery-date-label account__order--label">Delivery Date: </span>
        <span className="account__order--delivery-date account__order--value">{formatDate(deliveryDate)}</span>
      </div>
    </div>
  )
}

export default AccountOrderHeader;