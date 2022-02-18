import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AccountFriendList = () => {
  return (
    <div className="account__friends--friend-list">
      <div className="account__friend-list--heading-container">
        <h4 className="account__friend-list--heading">Friend List</h4>
        <div className="account__friend-list--send-request-btn">
          <FontAwesomeIcon className="account__friend-list--send-request-icon" icon={faPlus} />
          <span className="account__friend-list--send-request-text">Send Request</span>
        </div>
      </div>
    </div>
  )
}

export default AccountFriendList; 