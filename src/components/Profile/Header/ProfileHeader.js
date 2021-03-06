import { useContext } from 'react';
import { getRequest } from "../../../sevices/service";
import ProfileNav from "./ProfileNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../App";
const ProfileHeader = ({ userInfo }) => {
  const user = useContext(UserContext);
  const userUpvotes = userInfo.reviews.map(review => review.upvotes);

  const isLoggedInUsersFriend = async () => {
    if (user.token) {
      const response = await getRequest('https://albumphoria.herokuapp.com/friendlist', user.token);
      const userFriends = await response.json();
      const userMatch = userFriends.filter(friend => friend.id === userInfo.id);
      return userMatch.length === 0 ? false : true;
    }
  }

  return (
    <div className="profile-page__header">
      <div className="profile-page__header--top-section"></div>
      <div className="profile-page__header--middle-section"></div>
      <div className="profile-page__header--bottom-section">
        <div className="profile-page__header--profile-pic">
          <h1 className="profile-page__header--profile-pic-text-section">{userInfo.name.slice(0, 2).toUpperCase()}</h1>
        </div>
        <div className="profile-page__header--user-info">
          <span className="profile-page__header--name">{userInfo.name}</span>
        </div>
        <div className="profile-page__header--insights">
          <div className="profile-page__header--votes">
            <span className="profile-page__header--votes-value insight-value">{userUpvotes.length === 0 ? '0' : userUpvotes.reduce((prev, curr) => prev + curr)}</span> 
            <span className="profile-page__header--votes-label insight-label">Helpful Votes</span>
          </div>
          <div className="profile-page__header--review-count">
            <span className="profile-page__header--review-count-value insight-value">{userInfo.reviews.length}</span>
            <span className="profile-page__header--review-count-label insight-label">Reviews</span>
          </div>
        </div>
        {
          !isLoggedInUsersFriend() ?
            <div className="profile-page__header--send-request-btn">
              <FontAwesomeIcon className="profile-page__header--send-request-icon" icon={faPlus} />
              <span className="profile-page__header--send-request-text">Send Friend Request</span>
            </div>
          :
            null
        }
        <nav className="profile-page__header--profile-navbar">
          <ul className="profile-page__header--profile-navbar-list">
            <ProfileNav name="reviews" />
            <ProfileNav name="wishlist" />
            <ProfileNav name="friends" />
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default ProfileHeader;