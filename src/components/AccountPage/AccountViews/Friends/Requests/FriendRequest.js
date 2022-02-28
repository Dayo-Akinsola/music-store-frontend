import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { dataChangeRequest } from '../../../../../sevices/service';

const FriendRequest = ({ user, request, getFriendRequests}) => {
  const requestElement = useRef(null);

  const requestResponse = async (accept) => {
    const responseData = {
      name: request.name,
      username: request.username,
      accept,
    }

    if (accept) {
      requestElement.current.classList.add('accepted');
    } else {
      requestElement.current.classList.add('rejected');
    }
    await dataChangeRequest('http://localhost:3001/friends/request/response', responseData, user.token, 'POST');
    await getFriendRequests();
  }

  return (
    <div className="account__friend-requests--request" ref={requestElement}>
      <div className="account__request--user-profile">
        <span className="account__request--user-profile-text">{request.name.slice(0, 2)}</span>
      </div>
      <div className="account__request--user-name-wrapper">
        <span className="account__request--user-name">{request.name}</span>
      </div>
      <div className="account__request--options">
        <div className="account__request--accept-wrapper option-wrapper" onClick={() => requestResponse(true)}>
          <FontAwesomeIcon icon={faCheck} className="account__request--accept" />
        </div>
        <div className="account__request--reject-wrapper option-wrapper" onClick={() => requestResponse(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="account__request--reject" viewBox="0 0 320 512">
            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default FriendRequest;