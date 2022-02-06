import mastercardLogo from '../../../../assets/payment-logos/mastercard.svg';
import visaLogo from '../../../../assets/payment-logos/visa.png';
import maestroLogo from '../../../../assets/payment-logos/maestro.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcAmex } from "@fortawesome/free-brands-svg-icons"
import PaymentForm from './PaymentForm';
import CheckoutSummary from '../CheckoutSummary';

const Payment = ({ cart, inputInvalidStyle, inputValidStyle }) => {
  return (
    <div className="payment">
      <div className="payment__details">
        <h3 className="payment__heading">Payment</h3>
        <div className="payment__details--accepted-cards">
          <span className="payment__accepted-cards--label">We Accept</span>
          <div className="payment__accepted-cards--logos">
            <img src={mastercardLogo} alt="mastercard" className="payment__accepted-cards--mastercard payment-logo" />
            <img src={visaLogo} alt="visa" className="payment__accepted-cards--visa payment-logo" />
            <FontAwesomeIcon icon={faCcAmex} className="payment__accepted-cards--amex payment-logo" />
            <img src={maestroLogo} alt="maestro" className="payment__accepted-cards--maestro payment-logo" />
          </div>
        </div>
        <PaymentForm inputInvalidStyle={inputInvalidStyle} inputValidStyle={inputValidStyle} />
      </div>
      <div className="payment__order-summary">
        <CheckoutSummary cart={cart} />
      </div>
    </div>
  )
}

export default Payment;