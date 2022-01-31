import RemoveAlbumBtn from "../Shared/RemoveAlbumBtn";
import QuantityInput from "../Shared/QuantityInput";
import { Link } from "react-router-dom";

const OrderItem = ({ album, albumQuantityControl, removeCartAlbum }) => {

  const { handleAlbumQuantityChange, incrementAlbumQuantity, decrementAlbumQuantity } = albumQuantityControl;

  return (
    <tr className="order-summary__table--album">
      <td className="order-summary__table--remove-btn">
        <RemoveAlbumBtn removeCartAlbum={removeCartAlbum} cartAlbum={album} classNamePrefix="order-summary__table" />
      </td>
      <td className="order-summary__table--img">
        <Link to={`/shop/${encodeURIComponent(album.title).replaceAll('%20', '-').replace('---', '-')}/releases/${album.id}`}>
            <figure className="order-summary__table--img-container">
              <img src={album.thumb} alt={album.title} className="order-summary__table--album-img" />
            </figure>
        </Link>
      </td>
      <td className="order-summary__table--title">
        <Link to={`/shop/${encodeURIComponent(album.title).replaceAll('%20', '-').replace('---', '-')}/releases/${album.id}`}>
          {album.title}
        </Link>
      </td>
      <td className="order-summary__table--unit-price">£{album.price.toFixed(2)}</td>
      <td className="order-summary__table--quantity">
        <QuantityInput 
          quantity={album.quantity} 
          decrementQuantity={() => decrementAlbumQuantity(album)} 
          incrementQuantity={() => incrementAlbumQuantity(album)} 
          handleQuantityChange={(event) => handleAlbumQuantityChange( event,  album)}
          classNamePrefix="order-summary__table--album"
        />
      </td>
      <td className="order-summary__table--subtotal">£{(album.price*album.quantity).toFixed(2)}</td>
    </tr>
  )
}

export default OrderItem;