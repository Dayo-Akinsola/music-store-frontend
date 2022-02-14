import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import NavMenu from './NavMenu';

const Header = ({ displayCart, totalQuantity, hidden, toggleNavDisplay, user }) => {

  const singleDigitPosition = {
    right: '0.7em',
  }
  const doubleDigitPosition = {
    right: '0.45em',
  }

  return (
    <div className="header">
      <NavMenu hidden={hidden} toggleNavDisplay={toggleNavDisplay} user={user} />
      <div className="header__top">
        <h2 className="header__top--heading">Album Store</h2>
        <div onClick={displayCart} className="header__top--cart-icon-container">
          <span className="header__top--cart-count" style={totalQuantity >= 10 ? doubleDigitPosition : singleDigitPosition}>{totalQuantity}</span>
          <FontAwesomeIcon className="header__top--cart-icon" icon={faShoppingCart} />
        </div>
      </div> 
    </div>
  )
}

export default Header;