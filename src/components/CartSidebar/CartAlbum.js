const CartAlbum = ({ cartAlbum }) => {
  return (
    <div className="cart-sidebar__cart-album">
      <img src={cartAlbum.thumb} alt={cartAlbum.albumTitle} className="cart-sidebar__cart-album--img" />
      <div className="cart-sidebar__cart-album--text">
        <span className="cart-sidebar__cart-album--title">{cartAlbum.title}</span>
        <span className="cart-sidebar__cart-album--unit">£{cartAlbum.price.toFixed(2)}</span>
        <span className="cart-sidebar__cart-album--quantity">Quantity: {cartAlbum.quantity}</span>
      </div>
    </div>
  );
}

export default CartAlbum;