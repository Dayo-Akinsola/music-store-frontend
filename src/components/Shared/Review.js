import { useParams } from "react-router-dom";
import formatDate from "../../helpers/formatDate";
import { dataChangeRequest } from "../../sevices/service";
import ReviewedAlbum from "./ReviewedAlbum";

const Review = ({ review, userInfo, page }) => {
  const params = useParams();
  
  const updateReviewdAlbumThumb = async (event) => {
    const response = await dataChangeRequest('http://localhost:3001/reviews/thumb', 
      {reviewId: review._id, userId: params.userId ? params.userId : userInfo.id}, null, 'PUT'
    );
    const updatedThumb = await response.json();
    event.target.src = updatedThumb;
  }

  return (
    <div className={`${page}__review`} >
      <div className={`${page}__review--header`}>
        <div className={`${page}__review--header-profile-pic`}>
          <span className={`${page}__review--header-profile-text`}>{userInfo.name.slice(0, 2)}</span>
        </div>
        <div className={`${page}__review--header-user-info-container`}>
          <div className={`${page}__review--header-star-rating`} style={{'--rating': review.rating}}></div>
        </div>
      </div>
      <div className={`${page}__review-date-wrapper`}>
        <span className={`${page}__review-date`}>{formatDate(review.date)}</span>
      </div>
      <div className={`${page}__review--headline-wrapper`}>
        <span className={`${page}__review--headline`}>{review.headline}</span>
      </div>
      <div className={`${page}__review--content-wrapper`}>
        <span className={`${page}__review--content`}>{review.reviewText}</span>
      </div>
      <ReviewedAlbum album={review.album} page={page} updateReviewdAlbumThumb={updateReviewdAlbumThumb} />
    </div>
  )
}

export default Review;