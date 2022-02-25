import formatDate from "../../../../helpers/formatDate";
import ReviewedAlbum from "./ReviewedAlbum";

const ProfileReviews = ({ userInfo }) => {
  const { reviews } = userInfo;
  
  
  return (
    <div className="profile-page__reviews">
      <div className="profile-page__reviews--heading-wrapper">
        <h2 className="profile-page__reviews--heading">{userInfo.name}'s Reviews</h2>
      </div>
      {reviews.map(review => (
        <div className="profile-page__review" key={review._id}>
          <div className="profile-page__review--header">
            <div className="profile-page__review--header-profile-pic">
              <span className="profile-page__review--header-profile-text">{userInfo.name.slice(0, 2)}</span>
            </div>
            <div className="profile-page__review--header-user-info-container">
              <div className="profile-page__review--header-star-rating" style={{'--rating': review.rating}}></div>
            </div>
          </div>
          <div className="profile-page__review-date-wrapper">
            <span className="profile-page__review-date">{formatDate(review.date)}</span>
          </div>
          <div className="profile-page__review--headline-wrapper">
            <span className="profile-page__review--headline">{review.headline}</span>
          </div>
          <div className="profile-page__review--content-wrapper">
            <span className="profile-page__review--content">{review.reviewText}</span>
          </div>
          <ReviewedAlbum album={review.album} />
        </div>
      ))}
    </div>
  )
}

export default ProfileReviews;