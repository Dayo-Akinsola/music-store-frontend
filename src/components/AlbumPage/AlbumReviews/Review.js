import { useContext } from 'react';
import formatDate from "../../../helpers/formatDate";
import { dataChangeRequest } from "../../../sevices/service";
import { UserContext } from '../../../App';

const Review = ({ review, getAlbumReviews, userVotedReviews, getUserVotedReviews, setNotification }) => {

  const user = useContext(UserContext);
  const voteReview = async (voteType) => {
    const voteData = {
      reviewId: review._id,
      vote: voteType,
    }
    const response = await dataChangeRequest('https://albumphoria.herokuapp.com/reviews/vote', voteData, user.token, 'PUT');
    if (response.ok) {
      await getAlbumReviews();
      await  getUserVotedReviews();
    } else {
      const data = await response.json();
      setNotification(data.error);
    }
   
  }

  /* Variable used to check if the logged in user has voted on this review before */
  const reviewMatch = userVotedReviews.filter(votedReview => votedReview.reviewId === review._id);

  return (
    <div className="album-page__review">
      <div className="album-page__review--header">
        <div className="album-page__review--header-profile-pic">
          <span className="album-page__review--header-profile-text">{review.user.name.slice(0, 2)}</span>
        </div>
        <div className="album-page__review--header-user-info-container">
          <span className="album-page__review--header-name">{review.user.name}</span>
          <div className="album-page__review--header-star-rating" style={{'--rating': review.rating}}></div>
        </div>
      </div>
      <div className="album-page__review-date-wrapper">
        <span className="album-page__review-date">{formatDate(review.date)}</span>
      </div>
      <div className="album-page__review--headline-wrapper">
        <span className="album-page__review--headline">{review.headline}</span>
      </div>
      <div className="album-page__review--content-wrapper">
        <span className="album-page__review--content">{review.reviewText}</span>
      </div>
      <div className="album-page__review--vote-section">
        {
          review.user.id !== user.id ?
          <>
          <span className="album-page__review--vote-question">Was this review helpful?</span>
          <div className="album-page__review--vote-btns">
            <button className="album-page__review--upvote-btn review-vote-btn" onClick={() => voteReview(true)}>
              <span style={{'color': (reviewMatch.length !== 0 && reviewMatch[0].vote ? 'forestgreen' : 'black')}}>Yes &#58; {review.upvotes}</span>
            </button>
            <button className="album-page__review--downvote-btn review-vote-btn" onClick={() => voteReview(false)}>
              <span style={{'color': (reviewMatch.length !== 0 && !reviewMatch[0].vote ? 'crimson' : 'black')}}>No &#58; {review.downvotes}</span>
            </button>
          </div>
          </>
          :
          null
        }
      </div>
    </div>
  )
}

export default Review;