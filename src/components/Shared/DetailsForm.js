/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';
import { getRequest } from '../../sevices/service';
import FormSection from './FormSection';
import { UserContext } from '../../App';

const DetailsForm = ({ deliveryDetails, setDeliveryDetails, handleSubmit, errorMessages, formName, btnText }) => {
  const user = useContext(UserContext);
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

  return (
    <form className={`${formName}--form`} onSubmit={handleSubmit} noValidate>
      <div className="form__name">
        <FormSection 
          name='firstName' 
          className='first-name' 
          label='First Name'
          detail={deliveryDetails.firstName} 
          errorMessage={errorMessages.firstName} 
          handleInputChange={handleInputChange}
          type='text'
        ></FormSection>
        <FormSection 
          name='lastName' 
          className='last-name'
          label='Last Name' 
          detail={deliveryDetails.lastName} 
          errorMessage={errorMessages.lastName} 
          handleInputChange={handleInputChange}
          type='text'
        ></FormSection>
      </div>
        <FormSection 
          name='city' 
          className='city'
          label='City' 
          detail={deliveryDetails.city} 
          errorMessages={errorMessages.city} 
          handleInputChange={handleInputChange}
          type='text'
        ></FormSection>
        <FormSection 
          name='address' 
          className='address'
          label='Address' 
          detail={deliveryDetails.address} 
          errorMessage={errorMessages.address} 
          handleInputChange={handleInputChange}
          type='text'
        ></FormSection>
      <FormSection 
          name='postCode' 
          className='post-code'
          label='Post Code' 
          detail={deliveryDetails.postCode} 
          errorMessage={errorMessages.postCode} 
          handleInputChange={handleInputChange}
          type='text'
      ></FormSection>
        <FormSection 
          name='phone' 
          className='phone'
          label='Phone' 
          detail={deliveryDetails.phone} 
          errorMessage={errorMessages.phone} 
          handleInputChange={handleInputChange}
          type='number'
        ></FormSection>
        <FormSection 
          name='email' 
          className='email'
          label='Email Address' 
          detail={deliveryDetails.email} 
          errorMessage={errorMessages.email} 
          handleInputChange={handleInputChange}
          type='email'
        ></FormSection>
      <div className="form__submit-btn-wrapper">
        <input type="submit" className="form__submit-btn" value={btnText} onSubmit={handleSubmit} />
      </div>
    </form>

  )
}

export default DetailsForm;
