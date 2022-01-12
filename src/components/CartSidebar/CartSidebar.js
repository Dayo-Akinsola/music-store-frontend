import CartAlbum from "./CartAlbum";

const CartSidebar = ({ cart, hideCart }) => {
  const priceReducer = (previousValue, currentValue) => (previousValue.price * previousValue.quantity) + (currentValue.price * currentValue.quantity);
  return (
    <div className="cart-sidebar">
      <div className="cart-sidebar__header">
        <h3 className="cart-sidebar__header--heading">Shopping Cart</h3>
        <svg onClick={hideCart} className="cart-sidebar__header--close" role="button" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"></path>
        </svg>
      </div>
      <div className="cart-sidebar__cart-albums">
        {cart.map(album => <CartAlbum cartAlbum={album} key={album.id} />)}
      </div>
      <div className="cart-sidebar__total">
        <span className="cart-sidebar__total--text">
          <b>Total ({cart.length} items):</b> 
          £{cart.length === 1 ? (cart[0].price * cart[0].quantity) : cart.reduce(priceReducer)}
        </span>
      </div>
      <button className="cart-sidebar__proceed-btn">Proceed</button>
    </div>
  )
}

export default CartSidebar;