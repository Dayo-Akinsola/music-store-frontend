import { useLocation } from "react-router-dom";
import WishlistModal from "../../../Shared/WishlistModal";
import ProfileWishlistComment from "./ProfileWishlistComment";

const ProfileWishlistModal = ({ user, addAlbumToCart }) => {
  const location = useLocation();

  return (
    <div className="profile-page__wishlist-album-modal">
      <div className="profile-page__wishlist-album-modal-content">
        <WishlistModal user={user} addAlbumToCart={addAlbumToCart} location={location} classNamePrefix='profile-page'/>
        <ProfileWishlistComment comment={location.state.album.comment} />
      </div>
    </div>
  )
}

export default ProfileWishlistModal;