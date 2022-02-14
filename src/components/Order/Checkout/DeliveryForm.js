/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRequest ,dataChangeRequest } from '../../../sevices/service';

const DeliveryForm = ({ user, deliveryDetails, setDeliveryDetails }) => {
  
  const [ errorMessages, setErrorMessages ] = useState({
    firstName: '',
    lastName: '', 
    address: '', 
    city: '', 
    postCode: '', 
    phone: '', 
    email: '',
  });

  useEffect(() => {
    const setStoredDetails = async () => {
      const { token } = user;
      if (token) {
        const response = await getRequest('http://localhost:3001/users/details', token);
        const userDetails = await response.json();
        setDeliveryDetails(userDetails);
      }
    }

    setStoredDetails();
  }, [user]);

  const navigate = useNavigate();

  const updateForm = (name, value) => {
    const updatedFormDetails = {...deliveryDetails};
    updatedFormDetails[name] = value;
    setDeliveryDetails(updatedFormDetails);
  }

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    if (name === 'postCode') {
      if (value.split(' ').join('').length < 8) {
        updateForm(name, value);
      }
    }

    else if (name === 'phone') {
      if (value.length <= 11){
        updateForm(name, value);
      } 
    }

    else if (value.length <= 50) {
      updateForm(name, value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputNames = Object.keys(deliveryDetails);
    let isFormValid = false;
    const formattedNames = {
      firstName: 'First Name',
      lastName: 'Last Name',
      address: 'Address',
      city: 'City / Town',
      postCode: 'Post Code',
      email: 'Email Address',
      phone: 'Phone Number',
    }

    inputNames.forEach(name => {
      let errorCaught = false;
      if (name === 'postCode') {
        const postCodeCheck = /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/.test(deliveryDetails.postCode);
        const invalidPostCodeMessage = 'You must enter a valid UK Post Code';
        if (!postCodeCheck) {
          setErrorMessages(messages => ({...messages, [name]: invalidPostCodeMessage}));
          errorCaught = true;        
        } 
      }

      if (name === 'phone') {
        const value = deliveryDetails[name];
        const invalidNumberMessage = 'You must enter a valid UK Phone Number.';
        if (value.length !== 10 && value.length !== 11) {
          setErrorMessages(messages => ({...messages, [name]: invalidNumberMessage}));
          errorCaught = true;
        }
      }

      if (name === 'email') {
        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(deliveryDetails.email);
        const invalidEmailMessage = 'You must enter a valid Email Address';
        if (!emailCheck) {
          setErrorMessages(messages => ({...messages, [name]: invalidEmailMessage}));
          errorCaught = true;
        }
      }

      if (deliveryDetails[name].length === 0) {
        const errorMessage = `Please enter your ${formattedNames[name]}.`;
        setErrorMessages((messages) => ({...messages, [name]: errorMessage}));
        errorCaught = true;
      }
      
      if (errorCaught) {
        isFormValid = false;
      }

      if (!errorCaught) {
        setErrorMessages(messages => ({...messages, [name]: ''}));
        isFormValid = true;
      }
    });

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
      <form className="checkout__details--form" onSubmit={handleSubmit} noValidate>
        <div className="form__name">
          <div className="form__first-name form-section">
            <label htmlFor="firstName" className="form__first-name--label">First Name</label>
            <input type="text" className="form__first-name--input" name="firstName" onChange={handleInputChange} value={deliveryDetails.firstName} />
            <div className="form__first-name--error">
              <span className="form__first-name--error-message error-message">{errorMessages.firstName}</span>
            </div>
          </div>
          <div className="form__last-name form-section">
            <label htmlFor="lastName" className="form__last-name--label">Last Name</label>
            <input type="text" className="form__last-name--input" name="lastName" onChange={handleInputChange} value={deliveryDetails.lastName}  />
            <div className="form__last-name--error">
              <span className="form__last-name--error-message error-message">{errorMessages.lastName}</span>
            </div>
          </div>
        </div>
        <div className="form__city form-section">
          <label htmlFor="city" className="form__city--label">City / Town</label>
          <input type="text" className="form__city--input" name="city" onChange={handleInputChange} value={deliveryDetails.city}/>
          <div className="form__city--error">
              <span className="form__city--error-message error-message">{errorMessages.city}</span>
            </div>
        </div>
        <div className="form__address form-section">
          <label htmlFor="address" className="form__address--label">Address</label>
          <input type="text" className="form__address--input" name="address" onChange={handleInputChange} value={deliveryDetails.address} />
          <div className="form__address--error">
            <span className="form__address--error-message error-message">{errorMessages.address}</span>
          </div>
        </div>
        <div className="form__post-code form-section">
          <label htmlFor="postCode" className="form__post-code--label">Post Code</label>
          <input type="text" className="form__post-code--input" name="postCode" onChange={handleInputChange} value={deliveryDetails.postCode} />
          <div className="form__post-code--error">
              <span className="form__post-code--error-message error-message">{errorMessages.postCode}</span>
            </div>
        </div>
        <div className="form__phone form-section">
          <label htmlFor="phone" className="form__phone--label">Phone</label>
          <input type="number" className="form__phone--input" name="phone" onChange={handleInputChange} value={deliveryDetails.phone} />
          <div className="form__phone--error">
            <span className="form__phone--error-message error-message">{errorMessages.phone}</span>
          </div>
        </div>
        <div className="form__email form-section">
          <label htmlFor="email" className="form__email--label">Email Address</label>
          <input type="email" className="form__email--input" name="email" onChange={handleInputChange} value={deliveryDetails.email}  />
          <div className="form__email--error">
            <span className="form__email--error-message error-message">{errorMessages.email}</span>
          </div>
        </div>
        <div className="form__submit-btn-wrapper">
          <input type="submit" className="form__submit-btn" value="Proceed To Payment" onSubmit={handleSubmit} />
        </div>
      </form>
    </div>
  )
}

export default DeliveryForm;