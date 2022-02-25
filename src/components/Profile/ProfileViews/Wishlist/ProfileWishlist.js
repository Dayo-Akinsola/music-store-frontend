import { Outlet } from "react-router-dom"
import WishlistAlbums from "../../../Shared/WishlistAlbums"

const ProfileWishlist = ({ userInfo }) => {
  return (
    <div className="profile-page__wishlist">
      <div className="profile-page__wishlist--heading-wrapper">
        <h2 className="profile-page__wishlist--heading">{userInfo.name}'s Wishlist</h2>
      </div> 
      <WishlistAlbums wishlist={userInfo.wishlist} page="profile-page" />
      <Outlet />
    </div>
  )
}

export default ProfileWishlist