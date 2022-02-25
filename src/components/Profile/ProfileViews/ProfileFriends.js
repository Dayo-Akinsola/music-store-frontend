import Friend from "../../Shared/Friend";

const ProfileFriends = ({ userInfo }) => {
  console.log(userInfo);
  return (
    <div className="profile-page__friends">
      <div className="profile-page__friends--heading-wrapper">
        <h2 className="profile-page__friends--heading">{userInfo.name}'s Friends</h2>
      </div> 
      <div className="profile-page--friends--friend-list">
        {
          userInfo.friends.map(friendInfo => (
            <Friend key={friendInfo.id} friendInfo={friendInfo} page='profile-page' />
          ))
        }
      </div>
    </div>
  )
}

export default ProfileFriends;