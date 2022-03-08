import DeliveryForm from "./DeliveryForm";
import CheckoutSummary from "./CheckoutSummary";

const CheckoutPage = ({ cart, deliveryDetails, setDeliveryDetails, formErrorCheck, errorMessages }) => {
  return (
    <div className="checkout">
      <h3 className="checkout__heading">Checkout</h3>
      <div className="checkout__content">
        <DeliveryForm deliveryDetails={deliveryDetails} setDeliveryDetails={setDeliveryDetails} formErrorCheck={formErrorCheck} errorMessages={errorMessages}/>
        <CheckoutSummary cart={cart} />
      </div>
    </div>
  )
}

export default CheckoutPage;