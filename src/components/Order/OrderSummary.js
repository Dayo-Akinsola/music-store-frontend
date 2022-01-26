import OrderItem from "./OrderItem";

const OrderSummary = ({ cart, albumQuantityControl, removeCartAlbum, totalQuantity }) => {
  return (
    <div className="order-summary">
      <div className="order-summary__table-container">
        <table className="order-summary__table">
          <thead>
            <tr className="order-summary__table--head">
              <th colSpan={3} className="order-summary__table--album-row table-head" >Album</th>
              <th className="order-summary__table--price-row table-head">Price</th>
              <th className="order-summary__table--quantity-row table-head">Quantity</th>
              <th className="order-summary__table--subtotal-row table-head">Subtotal</th>
            </tr>
          </thead>
          <tbody className="order-summary__table--albums">
            {cart.map((cartAlbum) => 
              <OrderItem 
                key={cartAlbum.id} 
                album={cartAlbum} 
                totalQuantity={totalQuantity} 
                albumQuantityControl={albumQuantityControl} 
                removeCartAlbum={removeCartAlbum}/>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderSummary;    