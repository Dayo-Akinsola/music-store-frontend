import WishlistModal from '../../../Shared/WishlistModal';
import AccountWishlistComment from './AccountWishlistComment';
import { useLocation } from 'react-router-dom';

const AccountWishlistAlbumModal = ({ addAlbumToCart }) => {
    const location = useLocation();

   return (    
    <div className="account__wishlist--album-modal">
      <div className="account__wishlist--album-modal-content">
        <WishlistModal location={location} addAlbumToCart={addAlbumToCart} classNamePrefix='account'  />
        <AccountWishlistComment album={location.state.album} />
      </div>
    </div>
   )
}

export default AccountWishlistAlbumModal;