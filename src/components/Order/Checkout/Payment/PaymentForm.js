import { useState, useEffect } from 'react';

const PaymentForm = () => {
	const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    name: '',
    security: '',
	});

  const [errorMessages, setErrorMessages] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    name: '',
    security: '',
  });

  const [btnActive, setBtnActive] = useState(false);

  useEffect(() => {
    const toggleSubmitBtn = () => {
      const names = Object.keys(paymentDetails);
      let emptyInput = false;
      names.forEach((name) => {
        if (paymentDetails[name] === '') {
          emptyInput = true;
        }
      });
      if (!emptyInput) {
        setBtnActive(true);
      } else {
        setBtnActive(false);
      }
    }

    toggleSubmitBtn();
  }, [paymentDetails]);

  const handleCardNumberChange = (event) => {
    const { name, value } = event.target;
    if (!isNaN(value)) {
      setPaymentDetails({...paymentDetails, [name] : value});
    }
  }

  const formatCardNumber = (event) => {
    const { name, value } = event.target;
    let formattedCardNumber = '';
    for (let i = 0; i <= value.length; i += 1) {
      if (i % 4 === 0 && i !== 0) {
        formattedCardNumber += value.substring(i - 4, i) + ' ';
      } 
    }
    if (value.length !== formattedCardNumber.split(' ').join('').length) {
      const missingNumbersLength = value.length - formattedCardNumber.split(' ').join('').length;
      const missingNumbers = value.substring(value.length - missingNumbersLength, value.length + 1);
      setPaymentDetails({...paymentDetails, [name] : `${formattedCardNumber}${missingNumbers}`});
    } else {
      setPaymentDetails({...paymentDetails, [name] : formattedCardNumber})
    }
  }

  const unFormatCardNumber = (event) => {
    const { name, value } = event.target;
    setPaymentDetails({...paymentDetails, [name] : value.split(' ').join('')});
  }

  const handleExpiryChange = (event) => {
    const { name, value } = event.target;
    if (value.length <= 2) {
      setPaymentDetails({...paymentDetails, [name] : value});
    }
  }

  const handleNameChange = (event) => {
    const {name, value} = event.target;
    const charCode = value.charCodeAt(value.length - 1);
    const isLetter = ((charCode >= 66 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32  ) ? true : false;
    if (isLetter) {
      setPaymentDetails({...paymentDetails, [name] : value});
    } else if (value === '') {
      setPaymentDetails({...paymentDetails, [name] : ''});
    }
  }

  const handleSecurityChange = (event) => {
    const { name, value } = event.target;
    if (value.length <= 4) {
      setPaymentDetails({...paymentDetails, [name] : value})
    }
  }

  const handleKeyDown = (event) => {
    const { key } = event;
    if (key === 'e' || key === '-' || key === '+') {
      event.preventDefault();
    }
  }

  const cardNumberErrorCheck = (event) => {
    const { name, value } = event.target;
    if (value.length !== 16) {
      const invalidCardNumberMessage = 'Please enter a valid card number.';
      setErrorMessages({...errorMessages, [name] : invalidCardNumberMessage});
    } else {
      setErrorMessages({...errorMessages, [name] : ''});
    }
  }

  const handleCardNumberBlur = (event) => {
    formatCardNumber(event);
    cardNumberErrorCheck(event);
  }

  const expiryDateErrorCheck = () => {
    let { expiryYear, expiryMonth } = paymentDetails;
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth();
    expiryYear = parseInt(expiryYear);
    expiryMonth = parseInt(expiryMonth);
    const invalidYear = expiryYear < currentYear || isNaN(expiryYear);    
    const invalidMonthInCurrentYear = ((currentYear === expiryYear) && (currentMonth >= expiryMonth - 1));

    if ( invalidYear || invalidMonthInCurrentYear) {
      const invalidYearMessage = 'Please enter a date that has not passed.';
      setErrorMessages({...errorMessages, 'expiryMonth' : invalidYearMessage });
    }

    if (expiryMonth > 12 || expiryMonth === 0 || isNaN(expiryMonth)) {
      const invalidMonthMessage = 'Please enter a valid month and year';
      setErrorMessages({...errorMessages, 'expiryMonth' : invalidMonthMessage });
    }

    if ((expiryMonth <= 12 && expiryMonth !== 0 && !isNaN(expiryMonth)) && (!invalidYear && !invalidMonthInCurrentYear)) {
      setErrorMessages({...errorMessages, 'expiryMonth': ''});
    }
  }

  const nameErrorCheck = (event) => {
    const { name, value } = event.target;
    if (value === '') {
      const invalidNameMessage = 'Please enter a valid card name';
      setErrorMessages({...errorMessages, [name] : invalidNameMessage})
    } else {
      setErrorMessages({...errorMessages, [name] : ''});
    }
  }

  const securityErrorCheck = (event) => {
    const { name, value } = event.target;
    if (value === '' || value.length < 3) {
      const invalidNameMessage = 'Please enter a valid code';
      setErrorMessages({...errorMessages, [name] : invalidNameMessage})
    } else {
      setErrorMessages({...errorMessages, [name] : ''});
    }
  }

  const removeErrorStyling = (event) => {
    const { name } = event.target;
    if (name === 'expiryYear') {
      setErrorMessages({...errorMessages, 'expiryMonth' : ''});
    } else {
      setErrorMessages({...errorMessages, [name] : ''});
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputNames = Object.keys(paymentDetails);
    let errorFound = false;
    inputNames.forEach((name) => {
      if (paymentDetails[name] === '' || errorMessages[name] !== '') {
        errorFound = true
      }
    });
    if (!errorFound) {
      console.log('Finalising payment');
    }
  }

  const inputInvalidStyle = {
    backgroundColor: '#ffdddd',
    border: '1px solid crimson',
  }

  const inputValidStyle = {
    backgroundColor: '#fff',
    border: '1px solid black',
  }

	return (
		<form className="payment__form" noValidate>
			<div className="payment__form--card-number-wrapper form-wrapper">
				<label htmlFor="cardNumber" className="payment__form--card-number-label">Card Number</label>
				<input 
          type="text"  
          name="cardNumber" 
          className="payment__form--card-number-input payment-input" 
          value={paymentDetails.cardNumber} 
          onChange={handleCardNumberChange}
          onKeyDown={event => (event.key === 'e' || event.key === ' ') ? event.preventDefault() : null} 
          onBlur={handleCardNumberBlur}
          onFocus={(event) => {unFormatCardNumber(event); removeErrorStyling(event); }}
          style={errorMessages.cardNumber === '' ? inputValidStyle : inputInvalidStyle}
        />
				<div className="payment__form--card-number-error error-wrapper">
					<span className="payment__form--card-number-error-message error-message">{errorMessages.cardNumber}</span>
				</div>
			</div>
			<div className="payment__form--name-wrapper form-wrapper">
				<label htmlFor="name" className="payment__form--name-label">Name on Card</label>
				<input 
          type="text" 
          name="name" 
          className="payment__form--name-input payment-input" 
          onChange={handleNameChange} 
          onBlur={nameErrorCheck} 
          value={paymentDetails.name} 
          style={errorMessages.name === '' ? inputValidStyle : inputInvalidStyle}
        />
				<div className="payment__form--name-error error-wrapper error-wrapper">
					<span className="payment__form--name-message error-message">{errorMessages.name}</span>
				</div>
      </div>
      <div className="payment__form--expiry-security-container">
        <div className="payment__form--expiry-wrapper form-wrapper">
          <label htmlFor="expiryMonth" className="payment__form--expiry-label">Expiry Date</label>
          <div className="payment__form--expiry-date-wrapper">
            <div className="payment__form--expiry-date">
              <input 
                type="number" 
                name="expiryMonth"
                placeholder="MM" 
                className="payment__form--expiry-month payment-input" 
                value={paymentDetails.expiryMonth} 
                onKeyDown={event => (event.key === 'e' || event.key === ' ') ? event.preventDefault() : null} 
                onChange={handleExpiryChange} 
                onBlur={expiryDateErrorCheck}
                onFocus={removeErrorStyling}
                style={(errorMessages.expiryMonth === '' && errorMessages.expiryYear  === '') ? inputValidStyle : inputInvalidStyle}
              />
              <span className="payment__form--slash">/</span>
              <input 
                type="number" 
                name="expiryYear" 
                placeholder="YY" 
                className="payment__form--expiry-year payment-input" 
                value={paymentDetails.expiryYear} 
                onKeyDown={event => (event.key === 'e' || event.key === ' ') ? event.preventDefault() : null} 
                onChange={handleExpiryChange} 
                onBlur={expiryDateErrorCheck}
                onFocus={removeErrorStyling}
                style={(errorMessages.expiryMonth === '' && errorMessages.expiryYear  === '') ? inputValidStyle : inputInvalidStyle}
              />
            </div>
            <div className="payment__form--expiry-error error-wrapper">
              <span className="payment__form--card-expiry-message error-message">{errorMessages.expiryMonth}</span>
            </div>
          </div>
        </div>
        <div className="payment__form--security-wrapper form-wrapper">
          <label htmlFor="security" className="payment__form--security-label">CVC/CVV</label>
          <input 
            type="number" 
            className="payment__form--security-input payment-input" 
            name="security" 
            onChange={handleSecurityChange} 
            value={paymentDetails.security}
            onKeyDown={handleKeyDown}
            onBlur={securityErrorCheck}
            style={errorMessages.security === '' ? inputValidStyle : inputInvalidStyle}
          />
          <div className="payment__form--security-error error-wrapper">
            <span className="payment__form--security-message error-message">{errorMessages.security}</span>
          </div>
        </div>
      </div>		
      {
        btnActive ? <button className="payment__form--submit-active" onClick={handleSubmit}>Complete Purchase</button>
          : <button className="payment__form--submit-disabled" onClick={(event) => event.preventDefault()}>Complete Purchase</button>
      }
		</form>	
	)
}

export default PaymentForm;