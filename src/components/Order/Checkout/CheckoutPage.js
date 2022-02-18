import DeliveryForm from "./DeliveryForm";
import CheckoutSummary from "./CheckoutSummary";

const CheckoutPage = ({ cart, user, deliveryDetails, setDeliveryDetails, formErrorCheck, errorMessages }) => {
  return (
    <div className="checkout">
      <h3 className="checkout__heading">Checkout</h3>
      <DeliveryForm user={user} deliveryDetails={deliveryDetails} setDeliveryDetails={setDeliveryDetails} formErrorCheck={formErrorCheck} errorMessages={errorMessages}/>
      <CheckoutSummary cart={cart} />
    </div>
  )
}

export default CheckoutPage;