import QuantityInput from "../Shared/QuantityInput";
import RemoveAlbumBtn from '../Shared/RemoveAlbumBtn';
import { dataChangeRequest } from "../../sevices/service";

const CartAlbum = ({ cartAlbum, albumQuantityControl, removeCartAlbum, user }) => {

  const { incrementAlbumQuantity, decrementAlbumQuantity, handleAlbumQuantityChange } = albumQuantityControl;

  const updateThumb = async (event) => {
    const response = await dataChangeRequest('https://albumphoria.herokuapp.com/users/cart/thumb', {albumId: cartAlbum.id}, user.token, 'PUT');
    const updatedThumb = await response.json();
    event.target.src = updatedThumb;
  }
  return (
    <div className="cart-sidebar__cart-album">
      <img src={cartAlbum.thumb} alt={cartAlbum.albumTitle} onError={updateThumb} className="cart-sidebar__cart-album--img" />
      <div className="cart-sidebar__cart-album--text">
        <span className="cart-sidebar__cart-album--title">{cartAlbum.title}</span>
        <span className="cart-sidebar__cart-album--unit">£{cartAlbum.price.toFixed(2)}</span>
          <QuantityInput 
            quantity={cartAlbum.quantity} 
            incrementQuantity={() => incrementAlbumQuantity(cartAlbum)} 
            decrementQuantity={() => decrementAlbumQuantity(cartAlbum)}
            handleQuantityChange={(event) => handleAlbumQuantityChange(event, cartAlbum)}
            classNamePrefix='cart-sidebar__cart-album'
          />
      </div>
      <RemoveAlbumBtn removeCartAlbum={removeCartAlbum} cartAlbum={cartAlbum} classNamePrefix="cart-sidebar__cart-album"/>
    </div>
  );
}

export default CartAlbum;