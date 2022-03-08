import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const PurchaseSection = ({ cart }) => {
  const user = useContext(UserContext);
  const reducer = (previousValue, currentValue) => (previousValue + currentValue);
  const subtotals = cart.map(album => album.price * album.quantity);
  return (
    <div className="order-summary__purchase">
      <div className="order-summary__purchase--total-wrapper">
        <span className="order-summary__purchase--total"><b>Total:</b> £{cart.length === 1 ? subtotals[0] : subtotals.reduce(reducer).toFixed(2)}</span>
      </div>
      {
        !user.token ? 
          (
          <div className="order-summary__purchase--order">
            <div className="order-summary__purchase--order-section">
              <Link to="/login">
                <button className="order-summary__purchase--order-btn">Sign In To Checkout</button>
              </Link>
              <span className="order-summary__purchase--order-info">*Saves details for quicker checkout next order</span>
            </div>
            <Link to="/checkout">
              <button className="order-summary__purchase--guest-order-btn">Guest Checkout</button> 
            </Link>
          </div>
          ) 
          :
          (
            <div className="order-summary__purchase--order">
              <div className="order-summary__purchase--order-section">
                <Link to="/checkout">
                  <button className="order-summary__purchase--order-btn">Checkout</button>
                </Link>
                <span className="order-summary__purchase--order-info">*Saves details for quicker checkout next order</span>
              </div>
            </div>
          )
      }
      
    </div>
  )
}

export default PurchaseSection;