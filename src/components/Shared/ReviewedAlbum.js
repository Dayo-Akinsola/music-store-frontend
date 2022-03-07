import { Link } from "react-router-dom";

const ReviewedAlbum = ({ album, page, updateReviewdAlbumThumb }) => {
  return (
    <Link 
        className={`${page}__review--album-link`}
        to={`/shop/${encodeURIComponent(album.title).replaceAll('%20', '-').replace('---', '-')}/releases/${album.id}`}>
      <div className={`${page}__review--album`}>
        <img src={album.thumb} alt={album.title} className={`${page}__review--album-img`} onError={updateReviewdAlbumThumb} />
        <span className={`${page}__review--album-title`}>{album.title}</span>
      </div>
    </Link>
  )
}

export default ReviewedAlbum;