/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getRequest } from "../../../../sevices/service";
import formatDate from "../../../../helpers/formatDate";

const PaymentConfirmationModal = ({ orderTimeRef, setShowConfirmModal, setCart }) => {
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [orderNum, setOrderNum] = useState(null);

  useEffect(() => {
    const getCurrentOrder = async () => {
      const response = await getRequest(`https://albumphoria.herokuapp.com/orders/${orderTimeRef}`);
      const order = await response.json();
      console.log(order);
      setDeliveryDate(formatDate(order.orderDate + 432000000));
      setOrderNum(order.id);
    }

    getCurrentOrder();
  }, [orderTimeRef]);

  useEffect(() => {
    return () => {
      localStorage.setItem('guest-cart', JSON.stringify([]));
      setCart([]);
    }
  }, []);

  return (
    <div className="payment__confirmation-modal">
      <div className="payment__confirmation-modal-content">
        <div className="payment__confirmation-modal--header">
          <FontAwesomeIcon icon={faCheckCircle} className="payment__confirmation-modal--icon" />
          <h3 className="payment__confirmation-modal--heading">Thank You For Your Order</h3>
        </div>
        <div className="payment__confirmation-modal--details">
          <div className="payment__confirmation-modal--detail">
            <span className="payment__confirmation-modal--label">Order No: </span>
            <span className="payment__confirmation-modal--value">{orderNum}</span>
          </div>
          <div className="payment__confirmation-modal--detail">
            <span className="payment__confirmation-modal--label">Estimated Delivery: </span>
            <span className="payment__confirmation-modal--value">{deliveryDate}</span>
          </div>
        </div>
        <button className="payment__confirmation-close-btn" onClick={() => setShowConfirmModal(false)}>Back To Shop</button>
      </div>
    </div>
  )
}

export default PaymentConfirmationModal;