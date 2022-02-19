import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FriendSearch from "../FriendRequestModal";

const AccountFriendListHeader = ({ user }) => {

  const [ modalOpen, setModalOpen ] = useState(false);

  return (
    <div className="account__friend-list--header">
      <div className="account__friend-list--heading-container">
        <h4 className="account__friend-list--heading">Friend List</h4>
        <div className="account__friend-list--send-request-btn" onClick={() => setModalOpen(true)}>
          <FontAwesomeIcon className="account__friend-list--send-request-icon" icon={faPlus} />
          <span className="account__friend-list--send-request-text">Send Request</span>
        </div>
      </div>
      {
        modalOpen ?
          <FriendSearch user={user} setModalOpen={setModalOpen} />
          :
          null
      }
    </div>
  )
}

export default AccountFriendListHeader;