import { Link } from "react-router-dom";
import { dataChangeRequest } from "../../../../sevices/service";

const AccountOrderAlbum = ({ album, order, user}) => {

  const updateOrderAlbumThumb = async (event) => {
    const response = await dataChangeRequest('http://localhost:3001/orders/thumb', { albumId: album.id, orderId: order._id},  user.token, 'PUT');
    const updatedThumb = await response.json();
    // event.target.src = updatedThumb;
  }

  return (
    <div className="account__order--album">
      <Link to={`/shop/${encodeURIComponent(album.title).replaceAll('%20', '-').replace('---', '-')}/releases/${album.id}`}>
        <div className="account__order--album-img-wrapper">
          <img src={album.thumb} alt={album.title} className="account__order--album-img" />
        </div>
      </Link>
      <div className="account__order--album-details">
        <div className="account__order--album-name-price">
          <Link className="account__order--album-name" to={`/shop/${encodeURIComponent(album.title).replaceAll('%20', '-').replace('---', '-')}/releases/${album.id}`}>
            <span >{album.title}</span>
          </Link>
          <span className="account__order--album-price">£ {album.price}</span>
        </div>
        <div className="account__order--album-quantity-wrapper">
          <span className="account__order--album-quantity">Qty: {album.quantity}</span>
        </div>
      </div>
    </div>
  )
}

export default AccountOrderAlbum;