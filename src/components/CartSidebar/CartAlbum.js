import QuantityInput from "../QuantityInput";

const CartAlbum = ({ cartAlbum, cart, setCart }) => {

  const incrementAlbumQuantity = () => {
    if (cartAlbum.quantity <= 20) {
      setCart(cart.map(album => {
        if (album.id === cartAlbum.id) {
          album.quantity += 1;
        }
        return album;
      }));
    }
  }

  const decrementAlbumQuantity = () => {
    if (cartAlbum.quantity > 1) {
      setCart(cart.map(album => {
        if (album.id === cartAlbum.id) {
          album.quantity -= 1;
        }
        return album;
      }));
    }
  }

  const handleAlbumQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value && value <= 20) {
      setCart(cart.map(album => {
        if (album.id === cartAlbum.id) {
          album.quantity = value;
        }
        return album;
      }));
    }
  }

  return (
    <div className="cart-sidebar__cart-album">
      <img src={cartAlbum.thumb} alt={cartAlbum.albumTitle} className="cart-sidebar__cart-album--img" />
      <div className="cart-sidebar__cart-album--text">
        <span className="cart-sidebar__cart-album--title">{cartAlbum.title}</span>
        <span className="cart-sidebar__cart-album--unit">£{cartAlbum.price.toFixed(2)}</span>
        <span className="cart-sidebar__cart-album--quantity">
          Quantity: 
          <QuantityInput 
            quantity={cartAlbum.quantity} 
            incrementQuantity={incrementAlbumQuantity} 
            decrementQuantity={decrementAlbumQuantity}
            handleQuantityChange={handleAlbumQuantityChange}
            classNamePrefix='cart-sidebar__cart-album'
          />
        </span>
      </div>
    </div>
  );
}

export default CartAlbum;