const ProfileWishlistComment = ({ comment }) => {
  return (
    <div className="profile-page__wishlist--album-modal-comment">
      <h4 className="profile-page__wishlist--comment-heading">Comment</h4>
      <div className="profile-page__wishlist--comment-wrapper">
        <span className="profile-page__wishlist--comment-content">{comment}</span>
      </div>
    </div>
  )
}

export default ProfileWishlistComment;  