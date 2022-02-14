import DeliveryForm from "./DeliveryForm";
import CheckoutSummary from "./CheckoutSummary";

const CheckoutPage = ({ cart, user, deliveryDetails, setDeliveryDetails }) => {
  return (
    <div className="checkout">
      <h3 className="checkout__heading">Checkout</h3>
      <DeliveryForm user={user} deliveryDetails={deliveryDetails} setDeliveryDetails={setDeliveryDetails}/>
      <CheckoutSummary cart={cart} />
    </div>
  )
}

export default CheckoutPage;