import { useState, useEffect } from 'react';
import { getRequest } from '../../../../../sevices/service';
import AccountFriendListHeader from './AccountFriendListHeader';
import Friend from '../../../../Shared/Friend';

const AccountFriendList = ({ user }) => {

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getUserFriends = async () => {
      const response = await getRequest('http://localhost:3001/friends/friendlist', user.token);
      const allFriends = await response.json();
      setFriends(allFriends);
    }
    getUserFriends();
  }, [user.token]);

  return (
    <div className="account__friends--friend-list-container">
      <AccountFriendListHeader user={user} />
      <div className="account__friends--friend-list">
        {
          friends.map(friendInfo => (
            <Friend key={friendInfo.id} friendInfo={friendInfo} page='account' />
          ))
        }
      </div>
    </div>   
  )
}

export default AccountFriendList; 