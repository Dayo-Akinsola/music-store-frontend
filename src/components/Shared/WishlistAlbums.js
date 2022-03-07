import WishlistAlbum from "./WishlistAlbum";

const WishlistAlbums = ({ wishlist, page, user }) => {
 
  return (
    <div className={`${page}__wishlist-albums`}>
      <div className={`${page}__wishlist-albums--container`}>
        {
          wishlist.map((album) => (
           <WishlistAlbum album={album} user={user} page={page} key={album.albumId} />
          ))
        }
      </div>
    </div>
  )
}

export default WishlistAlbums;