import WishlistModal from '../../../Shared/WishlistModal';
import AccountWishlistComment from './AccountWishlistComment';
import { useLocation } from 'react-router-dom';

const AccountWishlistAlbumModal = ({ user, addAlbumToCart }) => {
    const location = useLocation();

   return (    
    <div className="account__wishlist--album-modal">
      <div className="account__wishlist--album-modal-content">
        <WishlistModal location={location} user={user} addAlbumToCart={addAlbumToCart} classNamePrefix='account'  />
        <AccountWishlistComment  album={location.state.album} user={user}/>
      </div>
    </div>
   )
}

export default AccountWishlistAlbumModal;