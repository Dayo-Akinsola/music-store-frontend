import { useState, useEffect } from 'react';
import { getRequest } from '../../../../../sevices/service';
import AccountFriendListHeader from './AccountFriendListHeader';

const AccountFriendList = ({ user }) => {

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getAllFriends = async () => {
      const response = await getRequest('http://localhost:3001/friends/friendlist', user.token);
      const allFriends = await response.json();
      setFriends(allFriends);
    }
    getAllFriends();
  }, [user.token]);

  return (
    <div className="account__friends--friend-list-container">
      <AccountFriendListHeader user={user} />
      <div className="account__friends--friend-list">
        {
          friends.map(friend => (
            <div key={friend.id} className="account__friend-list--friend">
              <div className="account__friend-list--profile-pic">
                <span className="account__friend-list--profile-pic-text">{friend.name.slice(0, 2)}</span>
              </div>
              <div className="account__friend-list--details">
                <span className="account__friend-list--name">{friend.name}</span>
                <button className="account__friend-list--profile-btn">View Profile</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>   
  )
}

export default AccountFriendList; 