import { Link } from "react-router-dom";

const WishlistAlbums = ({ wishlist, page }) => {

  return (
    <div className={`${page}__wishlist-albums`}>
      <div className={`${page}__wishlist-albums--container`}>
        {
          wishlist.map((album) => (
            <Link
              to={album._id}
              state={{
                album,
              }}
              key={album._id}
              className={`${page}__wishlist-albums--link`}
            >
              <div className={`${page}__wishlist-albums--album-bg-img`} 
                style={{background: `linear-gradient(#00000065, #00000065), url(${album.image}) center no-repeat`, backgroundSize: 'cover'}} >
                <span className={`${page}__wishlist-albums--album-title`}>{album.title}</span>
            </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default WishlistAlbums;