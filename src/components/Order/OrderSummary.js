import OrderItem from "./OrderItem";
import PurchaseSection from "./PurchaseSection";
import { Link } from "react-router-dom";

const OrderSummary = ({ cart, albumQuantityControl, removeCartAlbum, totalQuantity, user }) => {

  return (
    <div className="order-summary">
      <h3 className="order-summary__heading">Your Albums</h3>
      <div className="order-summary__table-container">
        {
          cart.length >= 1 
            ?
            <table className="order-summary__table">
              <thead>
                <tr className="order-summary__table--head">
                  <th colSpan={3} className="order-summary__table--album-row table-head" >Album</th>
                  <th className="order-summary__table--price-row table-head">Price</th>
                  <th className="order-summary__table--quantity-row table-head table-head-quantity">Quantity</th>
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
            :
            <div className="order-summary__table--no-albums">
              <div className="order-summary__table--no-albums-message-wrapper">
                <span className="order-summary__table--no-albums-message">Your shopping cart is empty</span>
              </div>
              <Link to="/shop/all">
                <button className="order-summary__table--no-albums-btn">Return To Shop</button>
              </Link>
            </div>
        }
      </div>
      {cart.length >= 1 ? <PurchaseSection cart={cart} user={user} /> : null}
    </div>
  )
}

export default OrderSummary;    