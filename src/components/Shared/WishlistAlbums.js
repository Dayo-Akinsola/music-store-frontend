import WishlistAlbum from "./WishlistAlbum";

const WishlistAlbums = ({ wishlist, page }) => {
 
  return (
    <div className={`${page}__wishlist-albums`}>
      <div className={`${page}__wishlist-albums--container`}>
        {
          wishlist.map((album) => (
           <WishlistAlbum album={album} page={page} key={album.albumId} />
          ))
        }
      </div>
    </div>
  )
}

export default WishlistAlbums;