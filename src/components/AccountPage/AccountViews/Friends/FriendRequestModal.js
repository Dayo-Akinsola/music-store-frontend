import { useState } from 'react';
import { dataChangeRequest } from '../../../../sevices/service';
import FormSection from "../../../Shared/FormSection";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faCheck } from '@fortawesome/free-solid-svg-icons';

const FriendRequestModal = ({ user, setModalOpen }) => {

  const [requestDetails, setRequestDetails] = useState({
    requestName: '',
    requestUsername: '',
  });

  const [submitMessage, setSubmitMessage] = useState({
    message: '',
    error: true,
    showMessage: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setRequestDetails({
      ...requestDetails,
      [name]: value,
    });
  }

  const formErrorCheck = async () => {
    const requestData = {
      name: requestDetails.requestName,
      username: requestDetails.requestUsername,
    }
    const response = await dataChangeRequest('http://localhost:3001/friends/request', requestData, user.token, 'POST');
    if (response.status !== 200) {
      const error = await response.json();
      const errorMessage = error.error;
      setSubmitMessage({
        message: errorMessage,
        error: true,
        showMessage: true,
      });
      return true;
    } else {
      const data = await response.json();
      const { message }  = data;
      setSubmitMessage({
        message,
        error: false,
        showMessage: true,
      });
      return false;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorFound = await formErrorCheck();
    if (!errorFound) {
      setRequestDetails({
        requestName: '',
        requestUsername: '',
      });
      setTimeout(() => {
        setSubmitMessage({
          ...submitMessage,
          showMessage: false,
        })
      }, 3000)
    }  
  }

  return (
    <div className="account__friends--friend-request-modal">
      <div className="account__friends--friend-request-modal-content">
        <div className="account__friend-request-modal--header">
          <span className="account__friend-request-modal--header-text">Send a Friend Request</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="account__friend-request-modal--header-close" viewBox="0 0 320 512" onClick={() => setModalOpen(false)}>
            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
          </svg>
        </div>
        <div className="account__friend-request-modal--main">
          <div className="account__friend-request-modal--info-wrapper">
            <span className="account__friend-request-modal--info">Type in a user's name and username to send them a request.</span>
          </div>
          <form className="account__friend-request-modal--form" onSubmit={handleSubmit} noValidate>
            <FormSection 
              name='requestName'
              className='account__friend-request-modal--name'
              label='Name'
              detail={requestDetails.requestName}
              errorMessage={null}
              handleInputChange={handleInputChange}
              type='text'
            />
            <FormSection 
              name='requestUsername'
              className='account__friend-request-modal--name'
              label='Username'
              detail={requestDetails.requestUsername}
              errorMessage={null}
              handleInputChange={handleInputChange}
              type='text'
            />
            <button type='submit' className="account__friend-request-modal--submit-btn">Send Request</button>
          </form>
          { 
          submitMessage.showMessage ?
            (
            submitMessage.error ?
              <div className="account__friend-request-modal--submit-message-error-wrapper">
                <FontAwesomeIcon className="account__friend-request-modal--submit-error-icon" icon={faExclamation} />
                <span className="account__friend-request-modal--submit-error-message">{submitMessage.message}</span>
              </div>
              :
              <div className="account__friend-request-modal--submit-message-success-wrapper">
                <FontAwesomeIcon className="account__friend-request-modal--submit-success-icon" icon={faCheck} />
                <span className="account__friend-request-modal--submit-success-message">{submitMessage.message}</span>
              </div>
            )
            :
            null
          }
          
        </div>
      </div>
    </div>
  )
}

export default FriendRequestModal;