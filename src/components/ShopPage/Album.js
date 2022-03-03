/* eslint-disable eqeqeq */
import { Link } from 'react-router-dom';

const Album = ({ album, pageNum, searchParams }) => {
  if (pageNum == searchParams.get('page')) {
    return (
      <div className="shop__album" >
        <Link to={`/shop/${encodeURIComponent(album.title).replaceAll('%20', '-').replace('---', '-')}/${album.type}/${album.id}`}>
          <div className="album__img-wrapper">
            <img src={album.cover_image} alt={album.title} className="album__img" />
          </div>
          <div className="album__overview">
            <span className="album__title"><b>{album.title}</b></span>
            <span className="album__label">{album.label[0]}</span>
            <span className="album__price">£{album.price}</span>
          </div>
        </Link>
      </div>
    );
  }
  return null;
 
}

export default Album;