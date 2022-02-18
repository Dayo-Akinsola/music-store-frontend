import { Link } from "react-router-dom";

const AccountWishlistAlbums = ({ wishlist }) => {

  return (
    <div className="account__wishlist-albums">
      <div className="account__wishlist-albums--container">
        {
          wishlist.map((album) => (
            <Link
              to={album._id}
              state={{
                album,
              }}
              key={album._id}
            >
              <div className="account__wishlist-albums--album-bg-img" 
                style={{background: `linear-gradient(#00000065, #00000065), url(${album.image}) center no-repeat`, backgroundSize: 'cover'}} >
                <span className="account__wishlist-albums--album-title">{album.title}</span>
            </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default AccountWishlistAlbums;