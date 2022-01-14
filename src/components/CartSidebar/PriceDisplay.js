const PriceDisplay = ({ cart, totalQuantity }) => {

  const reducer = (previousValue, currentValue) => (previousValue) + (currentValue);
  const values = cart.map(album => album.price * album.quantity);

  if (cart.length >= 1) {
    return (
      <div className="cart-sidebar__total">
        <span className="cart-sidebar__total--text">
          <b>Total ({totalQuantity} items): </b> 
          £{(cart.length === 1 ? (cart[0].price * cart[0].quantity) : values.reduce(reducer)).toFixed(2)}
        </span>
      </div>
    )
  }

  return (
    <div className="cart-sidebar__total">
      <span className="cart-sidebar__total--text">
        <b>Total (0 items):</b> £0.00
      </span>
    </div>   
  )
  
}

export default PriceDisplay;