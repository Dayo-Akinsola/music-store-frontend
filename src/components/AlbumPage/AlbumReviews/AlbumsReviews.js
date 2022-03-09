/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import ReviewFormModal from "./ReviewFormModal";
import AlbumReviewPercentages from "./AlbumReviewPercentages";
import { getRequest } from "../../../sevices/service";
import Review from "./Review";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";

const AlbumReviews = ({ albumDetails, setNotification}) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [ratingsBreakdown, setRatingsBreakdown] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
  const [userVotedReviews, setUserVotedReviews] = useState([]);

  const closeModal = () => {
    setModalOpen(false);
  }

  const getAlbumReviews = async () => {
    const response = await getRequest(`http://localhost:3001/reviews/${albumDetails.id}`, null);
    const allReviews = await response.json();
    setReviews(allReviews);
    return allReviews;
  }

  /* Gets reviews that the current logged in user has upvoted or downvoted */
  const getUserVotedReviews = async () => {
    const response = await getRequest('http://localhost:3001/reviews/votedReviews', user.token);
    const votedReviews = await response.json();
    setUserVotedReviews(votedReviews);
  }

  useEffect(() => {

    const setRatings = async (albumReviews) => {
      const ratings = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      }

      albumReviews.forEach((review) => ratings[review.rating] += 1);
      setRatingsBreakdown(ratings);
    }

    const setReviewData = async () => {
      const albumReviews = await getAlbumReviews();
      setRatings(albumReviews);
    }

    setReviewData();
    getUserVotedReviews();
  }, [albumDetails.id, reviews.length]);

  return (
    <div className="album-page__reviews">
      <div className="album-page__reviews--header">
        <h3 className="album-page__reviews--header-heading">Reviews</h3>
        <button className="album-page__reviews--write-review-btn" onClick={() => user.token ? setModalOpen(true) : navigate('/login')}>Write A Review</button>
      </div>
      {
        modalOpen ?
          <ReviewFormModal albumDetails={albumDetails} closeModal={closeModal} setNotification={setNotification}/>
          :
          null
      }
      {
        reviews.length === 0 ?
          <div className="album-page__reviews--no-reviews-wrapper">
            <span className="album-page__reviews--no-reviews"><b>{albumDetails.albumTitle}</b> has not been reviewed yet</span>
          </div>
          :
          <div className="album-page__album-reviews-section">
            <AlbumReviewPercentages ratingsBreakdown={ratingsBreakdown} totalReviews={reviews.length} />
            <div className="album-page__album-reviews">
              {
                reviews.map(review => (
                  <Review 
                    review={review} 
                    getAlbumReviews={getAlbumReviews} 
                    userVotedReviews={userVotedReviews} 
                    getUserVotedReviews={getUserVotedReviews} 
                    setNotification={setNotification}
                    key={review._id}/>
                ))
              }
            </div>
          </div>
      }
    </div>
  )
}

export default AlbumReviews;