/* eslint-disable eqeqeq */
import { Link } from 'react-router-dom';

const Album = ({ album, pageNum, searchParams }) => {

  if (!searchParams || pageNum == searchParams.get('page')) {
    return (
      <div className="shop__album" >
        <Link to={`/shop/${encodeURIComponent(album.title).replaceAll('%20', '-').replace('---', '-')}/${album.type}/${album.id}`}>
          <div className="album__img-wrapper">
            <img src={album.cover_image} alt={album.title} className="album__img" />
          </div>
        </Link>
          <div className="album__overview">
            <Link to={`/shop/${encodeURIComponent(album.title).replaceAll('%20', '-').replace('---', '-')}/${album.type}/${album.id}`}>
              <span className="album__title"><b>{album.title}</b></span>
            </Link>
            <span className="album__label">{album.label[0]}</span>
            <span className="album__price">£{album.price}</span>
          </div>
      </div>
    );
  }
  return null;
 
}

export default Album;