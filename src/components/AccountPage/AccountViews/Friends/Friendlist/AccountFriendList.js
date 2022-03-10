import { useState, useEffect, useContext } from 'react';
import { getRequest } from '../../../../../sevices/service';
import AccountFriendListHeader from './AccountFriendListHeader';
import Friend from '../../../../Shared/Friend';
import { UserContext } from '../../../../../App';

const AccountFriendList = () => {
  const user = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getUserFriends = async () => {
      const response = await getRequest('https://albumphoria.herokuapp.com/friends/friendlist', user.token);
      const allFriends = await response.json();
      setFriends(allFriends);
    }
    getUserFriends();
  }, [user.token]);

  return (
    <div className="account__friends--friend-list-container">
      <AccountFriendListHeader />
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