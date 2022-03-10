import { useState, useContext } from "react";
import { dataChangeRequest } from "../../../sevices/service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../App";

const ReviewFormModal = ({ albumDetails, closeModal, setNotification }) => {

  const user = useContext(UserContext);
  const [reviewFormDetails, setReviewFormDetails] = useState({
    rating: 0,
    headline: '',
    writtenReview: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    rating: '',
    headline: '',
    writtenReview: '',
  });

  const [isChecked, setIsChecked] = useState({
    rating5: false,
    rating4: false,
    rating3: false,
    rating2: false,
    rating1: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setReviewFormDetails({
      ...reviewFormDetails,
      [name]: value,
    });
  }

  const resetForm = () => {
    setReviewFormDetails({
      rating: '',
      headline: '',
      writtenReview: '',
    });
  }

  const exitModal = () => {
    resetForm();
    closeModal();
  }

  const ratingClickHandler = (event) => {
    const { name } = event.target;
    const ratingsReset = {
      rating5: false,
      rating4: false,
      rating3: false,
      rating2: false,
      rating1: false,
    }
    setReviewFormDetails({
      ...reviewFormDetails,
      rating: parseInt(event.target.value),
    });
    setIsChecked(Object.assign(ratingsReset, { [name]: true }));
  }

  const errorChecking = () => {
    const { rating, headline, writtenReview } = reviewFormDetails;
    let errorFound = false;
    let ratingMessage = '';
    let headlineMessage = '';
    let writtenReviewMessage = '';
    if (rating === 0) {
      errorFound = true;
      ratingMessage = 'Please give a rating.'
    }

    if (headline.trim() === '') {
      errorFound = true;
      headlineMessage = 'Please write a headline.'
    }

    if (writtenReview.trim() === '') {
      errorFound = true;
      writtenReviewMessage = 'Please write a review.'
    }

    setErrorMessages({
      rating: ratingMessage,
      headline: headlineMessage,
      writtenReview: writtenReviewMessage,
    })

    if (!errorFound) {
      return false;
    }
    return true;
  }

  const postReview = async () => {
    const reviewData = {
      album: {
        id: albumDetails.id,
        title: albumDetails.albumTitle,
        thumb: albumDetails.thumb,
      },
      rating: reviewFormDetails.rating,
      headline: reviewFormDetails.headline,
      reviewText: reviewFormDetails.writtenReview,
      date: Date.now(),
      upvotes: 0,
      downvotes: 0,
    }
    return await dataChangeRequest('https://albumphoria.herokuapp.com/reviews', reviewData, user.token, 'POST');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorFound = errorChecking();

    if (!errorFound) {
      const response = await postReview();
      const data = await response.json();
      exitModal();

      if (!response.ok) {
        setNotification(data.error);
      }
    }
  }

  return (
    <div className="album-page__review-form-modal">
      <div className="album-page__review-form-modal-content">
        <FontAwesomeIcon className="album-page__review-form-modal--close" icon={faWindowClose} onClick={exitModal} />
        <div className="album-page__review-form-modal--album">
          <img src={albumDetails.cover_image} alt={albumDetails.albumTitle} className="album-page__review-form-modal--album-img" />
          <span className="album-page__review-form-modal--album-title">{albumDetails.title}</span>
        </div>
        <div className="album-page__review-form-modal--heading-wrapper">
          <h2 className="album-page__review-form-modal--heading">{`${user.name}'s Review`}</h2>
        </div>
        <form className="album-page__review-form" noValidate onSubmit={handleSubmit}>
          <div className="album-page__review-form--rating-container">
            <h4 className="album-page__review-form--rating-subheading review-form--subheading">Overall Rating</h4>
            <div className="album-page__review-form--rating-options">
              {
                Object.keys(isChecked).map((rating, index) => (
                  <span key={index + 1} className={isChecked[rating] ? "checked" : ""}>
                    <input 
                      type="radio" 
                      onClick={ratingClickHandler} 
                      className="album-page__review-form--rating" 
                      name={rating} 
                      value={rating.substring(rating.length - 1)}
                    />
                    <label htmlFor={rating}></label>
                  </span>
                ))
              }
            </div>
            <div style={{'display':`${errorMessages.rating === '' ? 'none' : 'block'}`}} className="album-page__review-form--rating-error review-form-error">
              <FontAwesomeIcon icon={faExclamationCircle} className="album-page__review-form--error-icon" />
              <span className="album-page__review-form--rating-error-message review-form-error-message">{errorMessages.rating}</span>
            </div>
          </div>
          <div className="album-page__review-form--headline">
            <label htmlFor="headline" className="album-page__review-form--headline-label">
              <h4 className="album-page__review-form--headline-subheading review-form-subheading">Review Headline</h4>
            </label>
            <input 
              type="text" 
              name="headline" 
              className="album-page__review-form--headline-input" 
              placeholder="What is most important to know?" 
              value={reviewFormDetails.headline}
              onChange={handleInputChange}
            />
            <div style={{'display':`${errorMessages.headline === '' ? 'none' : 'block'}`}}  className="album-page__review-form--headline-error review-form-error">
              <FontAwesomeIcon icon={faExclamationCircle} className="album-page__review-form--error-icon" />
              <span className="album-page__review-form--headline-error-message review-form-error-message">{errorMessages.headline}</span>
            </div>
          </div>
          <div className="album-page__review-form--written-review">
            <label htmlFor="wrttenReview" className="album-page__review-form--written-review-label">
              <h4 className="album-page__review-form--written-review-subheading review-form-subheadin">Write Review</h4>
            </label>
            <textarea 
              name="writtenReview" cols="30" rows="10" className="album-page__review-form--written-review-input" 
              placeholder="What did you think of the album?"
              value={reviewFormDetails.writtenReview}
              onChange={handleInputChange}
            >
            </textarea>
            <div style={{'display':`${errorMessages.writtenReview === '' ? 'none' : 'block'}`}} className="album-page__review-form--written-reveiw-error review-form-error">
              <FontAwesomeIcon icon={faExclamationCircle} className="album-page__review-form--error-icon" />
              <span className="album-page__review-form--written-review-error-message review-form-error-message">{errorMessages.writtenReview}</span>
            </div>
          </div>
          <button className="album-page__review-form--submit-btn" type='submit' onSubmit={handleSubmit}>Post Review</button>
        </form>
      </div>
    </div>
  )
}

export default ReviewFormModal;