import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlbumSummary from "./AlbumSummary";

const CheckoutSummary = ({ cart }) => {
  const subtotals = cart.map(album => album.price * album.quantity);
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = () => {
      if (cart.length === 0) {
        navigate('/');
      }
    }
    redirect();
  }, [cart, navigate])

  if (cart.length === 0) {
    return null;
  }
  return (
    <div className="checkout__summary">
      <h4 className="checkout__summary--heading">Order Summary</h4>
      <div className="checkout__summary--albums">
        {cart.map(album => <AlbumSummary key={album.id} album={album} />)}
      </div>
      <div className="checkout__summary--total-wrapper">
        <span className="checkout__summary--total-label">Total:</span>
        <span className="checkout__summary--total-value">
          £{(cart.length === 1 ? subtotals[0] : subtotals.reduce(reducer)).toFixed(2)}
        </span>
      </div>
    </div>
  )
}

export default CheckoutSummary;