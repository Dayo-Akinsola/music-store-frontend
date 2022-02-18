import { useState } from 'react';
import { useLocation, useNavigate ,Link } from "react-router-dom";
import { dataChangeRequest, getRequest } from "../../../../sevices/service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faWindowClose } from '@fortawesome/free-solid-svg-icons';

const AccountWishlistAlbumModal = ({ addAlbumToCart, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const album = location.state.album;

  const [ editMode, setEditMode ] = useState(false);
  const [ comment, setComment ] = useState(album.comment);

  const headerBackgroundStyle = {
    background: `url(${album.image}) center no-repeat`, 
    backgroundSize: 'cover'
  }

  const editComment = async () => {
    const newAlbumComment = {
      albumId: album.albumId,
      comment,
    }
    await dataChangeRequest('http://localhost:3001/wishlist', newAlbumComment, user.token, 'PUT');
    const response = await getRequest(`http://localhost:3001/wishlist/${album._id.toString()}`, user.token);
    const editedAlbum = await response.json();
    setComment(editedAlbum.comment);
    setEditMode(false);
  }

  const cancelEdit = async () => {
    const response = await getRequest(`http://localhost:3001/wishlist/${album._id.toString()}`, user.token);
    const currentAlbum = await response.json();
    setComment(currentAlbum.comment);
    setEditMode(false);
  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  const textAreaChangeHandler = (event) => {
    setComment(event.target.value);
  }

  const removeAlbumFromWishlist = async () => {
    await dataChangeRequest('http://localhost:3001/wishlist', {albumId: album.albumId}, user.token, 'DELETE');
    navigate('/account/wishlist', {
      state: {
        message: `${album.title} has been removed from your wishlist`,
      }
    });
  }

  const closeModal = () => {
    navigate(-1)
  }

  return (
    <div className="account__wishlist--album-modal">
      <div className="account__wishlist--album-modal-content">
        <div style={headerBackgroundStyle} className="account__wishlist--album-modal-bg-img">
          <div className="account__wishlist--close-btn-wrapper" onClick={closeModal}>
            <FontAwesomeIcon className="account__wishlist--close-btn" icon={faWindowClose}  />
          </div>
        </div>
        <div className="account__wishlist--main">
          <div className="account__wishlist--album-modal-details">
            <Link to={`/shop/${encodeURIComponent(album.title).replaceAll('%20', '-').replace('---', '-')}/releases/${album.albumId}`}>
              <span className="account__wishlist--album-modal-title">{album.title}</span>
            </Link>
            <span className="account__wishlist--album-modal-artist">{album.artist}</span>
            <span className="account__wishlist--album-modal-price">£ {album.price}</span>
          </div>
          <div className="account__wishlist--btns-container">
            <button className="account__wishlist--purchase-btn" onClick={() => addAlbumToCart(album)}>Add To Cart</button>
            <button className="account__wishlist--remove-btn" onClick={removeAlbumFromWishlist}>Remove From Wishlist</button>
          </div>
          <div className="account__wishlist--your-album-comment-wrapper">
            <div className="account__wishlist--your-alblum-comment-header">
              <h4 className="account__wishlist--your-album-comment-heading">Comment</h4>
              <FontAwesomeIcon icon={faPen} className="account__wishlist--add-edit-comment-btn" onClick={toggleEditMode} />
            </div>
            {
              editMode ?
                <>
                  <textarea 
                    name="comment" 
                    className="account__wishlist--your-album-comment-input" 
                    onChange={(event) => textAreaChangeHandler(event)} value={comment} >
                  </textarea>
                  <div className="account__wishlist--your-album-comment-input-btn-wrapper">
                    <button className="account__wishlist--your-album-comment-input-cancel" onClick={cancelEdit}>Cancel</button>
                    <button className="account__wishlist--your-album-comment-input-submit" onClick={editComment}>Confirm</button>
                  </div>
                </>
             
                :
                <span className="account__wishlist--your-album-comment">{comment}</span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountWishlistAlbumModal;