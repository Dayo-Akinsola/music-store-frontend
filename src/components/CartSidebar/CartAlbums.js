import CartAlbum from "./CartAlbum";

const CartAlbums = ({ cart, albumQuantityControl, removeCartAlbum }) => {
  if (cart.length === 0) {
    return (
      <div className="cart-sidebar__cart-albums--empty">
        <span className="cart-sidebar__empty-cart">You have no albums in your cart.</span> 
      </div>
    )
  }

  return (
    <div className="cart-sidebar__cart-albums">
      {cart.map(album => <CartAlbum cartAlbum={album} cart={cart} albumQuantityControl={albumQuantityControl} removeCartAlbum={removeCartAlbum} key={album.id} />)}
    </div> 
  )
}

export default CartAlbums;