import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import NavMenu from './NavMenu';

const Header = ({ displayCart, totalQuantity, hidden, toggleNavDisplay }) => {

  return (
    <div className="header">
      <NavMenu hidden={hidden} toggleNavDisplay={toggleNavDisplay} />
      <div className="header__top">
        <h2 className="header__top--heading">Album Store</h2>
        <div onClick={displayCart} className="header__top--cart-icon-container">
          <span className="header__top--cart-count">{totalQuantity}</span>
          <FontAwesomeIcon className="header__top--cart-icon" icon={faShoppingCart} />
        </div>
      </div> 
    </div>
  )
}

export default Header;