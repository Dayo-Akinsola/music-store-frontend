import AccountFriendListHeader from './AccountFriendListHeader';

const AccountFriendList = ({ user }) => {

  return (
    <div className="account__friends--friend-list">
      <AccountFriendListHeader user={user} />
      
    </div>   
  )
}

export default AccountFriendList; 