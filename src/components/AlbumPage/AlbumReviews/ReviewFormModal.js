import { useState } from "react";

const ReviewFormModal = ({ user, albumDetails }) => {

  const [reviewFormDetails, setReviewFormDetails] = useState({
    rating: 0,
    headline: '',
    writtenReview: '',
  });

  const [isChecked, setIsChecked] = useState({
    rating1: false,
    rating2: false,
    rating3: false,
    rating4: false,
    rating5: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setReviewFormDetails({
      ...reviewFormDetails,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const resetRatings = () => {
    setIsChecked({
      rating1: false,
      rating2: false,
      rating3: false,
      rating4: false,
      rating5: false,
    });
  }

  const ratingClickHandler = (event) => {
    const { name } = event.target;
    resetRatings();
    setIsChecked({
      ...isChecked,
      [name]: true,
    });
  }


  return (
    <div className="album-page__review-form-modal">
      <div className="album-page__review-form-modal-content">
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
              <span><input 
                type="radio" 
                onClick={ratingClickHandler} 
                className={`album-page__review-form-rating${isChecked.rating1 ? " checked" : ""}`} 
                name="rating5" 
                value="5"/><label htmlFor="rating5"></label></span>
              <span><input 
                type="radio" 
                onClick={ratingClickHandler} 
                className={`album-page__review-form-rating${isChecked.rating2 ? " checked" : ""}`} 
                name="rating4" 
                value="4"/><label htmlFor="rating4"></label></span>
              <span><input 
                type="radio" 
                onClick={ratingClickHandler} 
                className={`album-page__review-form-rating${isChecked.rating3 ? " checked" : ""}`} 
                name="rating3" 
                value="3"/><label htmlFor="rating3"></label></span>
              <span><input 
                type="radio" 
                onClick={ratingClickHandler} 
                className={`album-page__review-form-rating${isChecked.rating4 ? " checked" : ""}`} 
                name="rating2" 
                value="2"/><label htmlFor="rating2"></label></span>
              <span><input 
                type="radio" 
                onClick={ratingClickHandler} 
                className={`album-page__review-form-rating${isChecked.rating5 ? " checked" : ""}`} 
                name="rating1" 
                value="1"/><label htmlFor="rating1"></label></span>
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
          </div>
          <button className="album-page__review-form--submit-btn" type='submit' onSubmit={handleSubmit}>Post Review</button>
        </form>
      </div>
    </div>
  )
}

export default ReviewFormModal;