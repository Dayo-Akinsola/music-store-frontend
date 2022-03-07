/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { dataChangeRequest } from '../../sevices/service';

const WishlistAlbum = ({ album, page, user}) => {
  const params = useParams();
  console.log(params.userId);

  let  backgroundStyle = {
    background: `linear-gradient(#00000065, #00000065), url(${album.image}) center no-repeat`, backgroundSize: 'cover',
  }

  useEffect(() => {
    const checkImage = async () => {
      const image = new Image();
      image.addEventListener('error', async () => {
        const userId = user ? user.id : params.userId;
        const response = await dataChangeRequest('http://localhost:3001/wishlist/image', { albumId: album.albumId, userId}, null, 'PUT');
        if (response.ok) {
          const updatedImage = await response.json();
          backgroundStyle = {
            background: `linear-gradient(#00000065, #00000065), url(${updatedImage}) center no-repeat`, backgroundSize: 'cover',
          }
        } else {
          console.log('hello');
          backgroundStyle = {
            background: `linear-gradient(#00000065, #00000065), center no-repeat`, backgroundSize: 'cover',
          }
        }
       
      });
      image.src = album.image;
    }
    checkImage();
  }, [album, album.id, album.image, params.userId, user]);

  return (
    <Link
        to={album._id}
        state={{
          album,
        }}
        key={album._id}
        className={`${page}__wishlist-albums--link`}
      >
        <div className={`${page}__wishlist-albums--album-bg-img`} 
          style={backgroundStyle} >
          <span className={`${page}__wishlist-albums--album-title`}>{album.title}</span>
      </div>
    </Link>
  )
}

export default WishlistAlbum;