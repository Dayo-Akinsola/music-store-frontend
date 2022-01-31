import Details from "./Details";
import CheckoutSummary from "./CheckoutSummary";

const CheckoutPage = ({cart}) => {
  return (
    <div className="checkout">
      <h3 className="checkout__heading">Checkout</h3>
      <Details  />
      <CheckoutSummary cart={cart} />
    </div>
  )
}

export default CheckoutPage;