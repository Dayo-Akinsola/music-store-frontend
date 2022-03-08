import { useContext } from 'react/cjs/react.production.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { dataChangeRequest } from '../../../../../sevices/service';
import { UserContext } from '../../../../../App';

const FriendSearchResult = ({ searchResultUser, users, setUsers }) => {

  const user = useContext(UserContext);
  const checkUser = () => {
    const allUsers = users.map(user => {
      if (user.id === searchResultUser.id) {
        user.sentRequest = true;
      }
      return user;
    });
    setUsers(allUsers)
  }

  const sendFriendRequest = async (id) => {
    await dataChangeRequest('http://localhost:3001/friends/request', {id}, user.token, 'POST');
  }

  const clickHandler = async () => {
    checkUser();
    await sendFriendRequest(searchResultUser.id);
  }


  return (
    <div className="account__friend-request-modal--result">
      <div className="account__friend-request-modal--result-profile-pic">
        <span className="account__friend-request-modal--result-profile-text">{searchResultUser.name.slice(0, 2)}</span>
      </div>
      <div className="account__friend-request-modal--result-name-wrapper">
        <span className="account__friend-request-modal--result-name">{searchResultUser.name}</span>
      </div>
      {
        searchResultUser.sentRequest ?
          <div className="account__friend-request-modal--sent-request-wrapper">
            <FontAwesomeIcon className="account__friend-request-modal--sent-request-icon" icon={faCheck} />
            <span className="account__friend-request-modal--sent-request-text">Sent</span>
          </div>
          :
          <div className="account__friend-request-modal--request-icon-wrapper" onClick={clickHandler}>
            <FontAwesomeIcon className="account__friend-request-modal--requst-icon" icon={faPlus} />
          </div>
      }
    </div>
  )
}

export default FriendSearchResult;