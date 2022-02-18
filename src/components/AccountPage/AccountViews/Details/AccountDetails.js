import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import DetailsForm from '../../../Shared/DetailsForm';
import { dataChangeRequest } from '../../../../sevices/service';

const AccountDetails = ({ user, deliveryDetails, formErrorCheck, errorMessages, setDeliveryDetails }) => {

  const [ showConfirmation, setShowConfirmation ] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isFormValid = formErrorCheck();

    if (isFormValid) {
      await dataChangeRequest('http://localhost:3001/users/details', deliveryDetails, user.token, 'PUT');
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 5000)
    }
  }

  return (
    <div className="account__details">
      <div className="account__details--heading-container">
        <FontAwesomeIcon className='account__details--heading-icon' icon={faUserEdit} />
        <h2 className="account__details--heading">My Details</h2>
      </div>
      <DetailsForm 
        user={user} 
        deliveryDetails={deliveryDetails} 
        errorMessages={errorMessages} 
        setDeliveryDetails={setDeliveryDetails} 
        handleSubmit={handleSubmit}
        formName='account__details'
        btnText='Save Changes' 
      />
      {
        showConfirmation ?
          <div className="account__details--save-confirmation-wrapper">
            <FontAwesomeIcon icon={faCheck} className="account__details--save-confirmation-icon" />
            <span className="account__details--save-confirmation-text">Your Details Have Been Saved</span>
          </div> 
          :
          null 
      }
    </div>
  )
}

export default AccountDetails; 