import { useContext } from 'react';
import { Link } from "react-router-dom";
import { dataChangeRequest } from "../../../../sevices/service";
import { UserContext } from '../../../../App';

const AccountOrderAlbum = ({ album, order }) => {
  const user = useContext(UserContext);

  const updateOrderAlbumThumb = async (event) => {
    const response = await dataChangeRequest('https://albumphoria.herokuapp.com/orders/thumb', { albumId: album.id, orderId: order.id},  user.token, 'PUT');
    const updatedThumb = await response.json();
    event.target.src = updatedThumb;
  }

  return (
    <div className="account__order--album">
      <Link to={`/shop/${encodeURIComponent(album.title).replaceAll('%20', '-').replace('---', '-')}/releases/${album.id}`}>
        <div className="account__order--album-img-wrapper">
          <img src={album.thumb} alt={album.title} onError={updateOrderAlbumThumb} className="account__order--album-img" />
        </div>
      </Link>
      <div className="account__order--album-details">
        <Link className="account__order--album-name" to={`/shop/${encodeURIComponent(album.title).replaceAll('%20', '-').replace('---', '-')}/releases/${album.id}`}>
          <span >{album.title.length > 20 ? `${album.title.slice(0, 20)}...` : `${album.title}`}</span>
        </Link>
        <span className="account__order--album-price">£ {album.price.toFixed(2)}</span>
        <span className="account__order--album-quantity">x {album.quantity}</span>
      </div>
    </div>
  )
}

export default AccountOrderAlbum;