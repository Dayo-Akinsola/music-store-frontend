/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import {  dataChangeRequest } from '../../../sevices/service';
import DetailsForm from '../../Shared/DetailsForm';

const DeliveryForm = ({ user, deliveryDetails, setDeliveryDetails, formErrorCheck, errorMessages }) => {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const isFormValid = formErrorCheck();

    if (isFormValid) {
      dataChangeRequest('http://localhost:3001/users/details', deliveryDetails, user.token, 'PUT');
      navigate('/payment');
    }
  }

  const autoFillForm = () => {
    setDeliveryDetails({
      firstName: 'Dayo',
      lastName: 'Akinsola',
      address: '123 Random Street',
      city: 'London',
      postCode: 'EN22 1YD',
      phone: '0123456789',
      email: 'dayoakinsola3@gmail.com',
    });
  }
  
  return (
    <div className="checkout__details">
      <div className="checkout__details--fill-form">
        <button className="checkout__details--fill-form-btn" onClick={autoFillForm}>Fill Form</button>
      </div>
      <DetailsForm 
        user={user} 
        deliveryDetails={deliveryDetails} 
        setDeliveryDetails={setDeliveryDetails} 
        handleSubmit={handleSubmit} 
        errorMessages={errorMessages}
        formName='checkout__details'
        btnText='Proceed To Payment'
      />
    </div>
  )
}

export default DeliveryForm;