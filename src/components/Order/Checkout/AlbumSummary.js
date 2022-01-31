const AlbumSummary = ({ album }) => {
  return (
    <div className="checkout__summary--album">
      <div className="checkout__summary--album-product">
        <div className="checkout__summary--album-img-wrapper">
          <img src={album.thumb} alt={album.title} className="checkout__summary--album-img" />
        </div>
        <div className="checkout__summary--album-details-container">
          <span className="checkout__summary--album-title">{album.title}</span>
          <div className="checkout__summary--album-price-wrapper">
            <span className="checkout__summary--album-price-label">Unit Price:</span>
            <span className="checkout__summary--album-price-value">£{album.price.toFixed(2)}</span>
          </div>
          <div className="checkout__summary--album-quantity-wrapper">
            <span className="checkout__summary--album-quantity-label">Quantity:</span>
            <span className="checkout__summary--album-quantity-value">{album.quantity}</span>
          </div>
        </div>
      </div>
      <div className="checkout__summary--subtotal-wrapper">
        <span className="checkout__summary--subtotal-label">Subtotal:</span>
        <span className="checkout__summary--subtotal">£{(album.quantity * album.price).toFixed(2)}</span>
      </div>
    </div>
  )
}

export default AlbumSummary;