import { useState } from "react";
import ReviewFormModal from "./ReviewFormModal";

const AlbumReviews = ({ user, albumDetails, setNotification}) => {

  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <div className="album-page__reviews">
      <div className="album-page__reviews--header">
        <h3 className="album-page__reviews--header-heading">Reviews</h3>
        <button className="album-page__reviews--write-review-btn" onClick={() => setModalOpen(true)}>Write A Review</button>
      </div>
      {
        modalOpen ?
          <ReviewFormModal user={user} albumDetails={albumDetails} closeModal={closeModal} setNotification={setNotification}/>
          :
          null
      }
    </div>
  )
}

export default AlbumReviews;