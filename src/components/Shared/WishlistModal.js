import { useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { dataChangeRequest } from '../../sevices/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../App';

const AccountWishlistAlbumModal = ({ addAlbumToCart, location, page }) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const album = location.state.album;

  const headerBackgroundStyle = {
    background: `url(${album.image}) center no-repeat`, 
    backgroundSize: 'cover'
  }

  const removeAlbumFromWishlist = async () => {
    await dataChangeRequest('https://albumphoria.herokuapp.com/wishlist', {albumId: album.albumId}, user.token, 'DELETE');
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
    <>
      <div style={headerBackgroundStyle} className={`${page}__wishlist--album-modal-bg-img`}>
        <div className={`${page}__wishlist--close-btn-wrapper`} onClick={closeModal}>
          <FontAwesomeIcon className={`${page}__wishlist--close-btn`} icon={faWindowClose}  />
        </div>
      </div>
      <div className={`${page}__wishlist--main`}>
        <div className={`${page}__wishlist--album-modal-details`}>
          <Link to={`/shop/${encodeURIComponent(album.title).replaceAll('%20', '-').replace('---', '-')}/releases/${album.albumId}`}>
            <span className={`${page}__wishlist--album-modal-title`}>{album.title}</span>
          </Link>
          <span className={`${page}__wishlist--album-modal-artist`}>{album.artist}</span>
          <span className={`${page}__wishlist--album-modal-price`}>£ {album.price.toFixed(2)}</span>
        </div>
        <div className={`${page}__wishlist--btns-container`}>
          <button className={`${page}__wishlist--purchase-btn`} onClick={() => addAlbumToCart(album)}>Add To Cart</button>
          {
            location.pathname.includes('profile') ? null 
            :
            <button className={`${page}__wishlist--remove-btn`} onClick={removeAlbumFromWishlist}>Remove From Wishlist</button>
          }
        </div>
      </div>
    </>
  )
}

export default AccountWishlistAlbumModal;