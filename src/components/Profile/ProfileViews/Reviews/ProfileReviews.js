import Review from "../../../Shared/Review";

const ProfileReviews = ({ userInfo }) => {
  const { reviews } = userInfo;
  return (
    <div className="profile-page__reviews">
      <div className="profile-page__reviews--heading-wrapper">
        <h2 className="profile-page__reviews--heading">{userInfo.name}'s Reviews</h2>
      </div>
      {reviews.map(review => (
        <Review key={review._id} review={review} userInfo={userInfo} page='profile-page' />
      ))}
    </div>
  )
}

export default ProfileReviews;