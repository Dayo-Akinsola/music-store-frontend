import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Nav from './Nav';

const Header = ({ displayCart, totalQuantity }) => {

  return (
    <div className="header">
      <div className="header__top">
        <h2 className="header__top--heading">Album Store</h2>
        <div onClick={displayCart} className="header__top--cart-icon-container">
          <span className="header__top--cart-count">{totalQuantity}</span>
          <FontAwesomeIcon className="header__top--cart-icon" icon={faShoppingCart} />
        </div>
      </div> 
      <Nav />
    </div>
  )
}

export default Header;