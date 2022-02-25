import { Link } from "react-router-dom";
const ReviewedAlbum = ({ album }) => {
  return (
     <Link 
        className="profile-page__review--album-link" 
        to={`/shop/${encodeURIComponent(album.title).replaceAll('%20', '-').replace('---', '-')}/releases/${album.id}`}>
      <div className="profile-page__review--album">
        <img src={album.thumb} alt={album.title} className="profile-page__review--album-img" />
        <span className="profile-page__review--album-title">{album.title}</span>
      </div>
    </Link>

  )
}

export default ReviewedAlbum;