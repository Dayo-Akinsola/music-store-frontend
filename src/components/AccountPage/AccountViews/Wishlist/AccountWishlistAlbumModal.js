import { useState, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { dataChangeRequest } from "../../../../sevices/service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const AccountWishlistAlbumModal = ({ addAlbumToCart, user }) => {
  const location = useLocation();
  const album = location.state.album;

  const [ editMode, setEditMode ] = useState(false);
  const [ comment, setComment ] = useState(album.description);

  const headerBackgroundStyle = {
    background: `url(${album.image}) center no-repeat`, 
    backgroundSize: 'cover'
  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  const textAreaChangeHandler = (event) => {
    setComment(event.target.value);
  }

  const removeAlbumFromWishlist = async () => {
    await dataChangeRequest('http://localhost:3001/wishlist', {albumId: album.albumId}, user.token, 'DELETE');
  } 

  return (
    <div className="account__wishlist--album-modal">
      <div className="account__wishlist--album-modal-content">
        <div style={headerBackgroundStyle} className="account__wishlist--album-modal-bg-img">
          <span className="account__wishlist--close-btn">X</span>
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
                    <button className="account__wishlist--your-album-comment-input-cancel">Cancel</button>
                    <button className="account__wishlist--your-album-comment-input-submit">Confirm</button>
                  </div>
                </>
             
                :
                <span className="account__wishlist--your-album-comment">{album.description}</span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountWishlistAlbumModal;