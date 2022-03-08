const AccountOrderFooter = ({ order }) => {

  const { albums } = order;
  const albumTotals = albums.map(album => album.price * album.quantity);
  const reducer = (previous, current) => previous + current;

  return (
    <div className="account__order--footer">
      <div className="account__order--total">
        <span className="account__order--total-label account__order--footer-label">Total</span>
        <span className="account__order--total-value account__order--footer-value">£ {albumTotals.reduce(reducer).toFixed(2)}</span>
      </div>
      <div className="account__order--order-num">
        <span className="account__order--order-num-label account__order--footer-label">Order No</span>
        <span className="account__order--order-num-value account__order--footer-value">{order.id}</span>
      </div>
    </div>
  )
}

export default AccountOrderFooter