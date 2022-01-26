import CartAlbums from "./CartAlbums";
import PriceDisplay from "./PriceDisplay";
import { Link } from "react-router-dom";

const CartSidebar = ({ cart, hideCart, totalQuantity, albumQuantityControl, removeCartAlbum }) => {
  
  const btnHidden = {
    display: 'none',
  }
  const btnShown = {
    display: 'block',
  }

  return (
    <div className="cart-sidebar">
      <div className="cart-sidebar__header">
        <h3 className="cart-sidebar__header--heading">Shopping Cart</h3>
        <svg onClick={hideCart} className="cart-sidebar__header--close" role="button" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"></path>
        </svg>
      </div>
      <CartAlbums cart={cart} albumQuantityControl={albumQuantityControl} removeCartAlbum={removeCartAlbum} />
      <PriceDisplay cart={cart} totalQuantity={totalQuantity} />
      <Link to="/order">
        <button style={cart.length > 0 ? btnShown : btnHidden} className="cart-sidebar__proceed-btn">Proceed</button>
      </Link>
      <i className="fas fa-shopping-cart"></i>    
    </div>
  )
}

export default CartSidebar;