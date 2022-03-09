import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faMusic } from '@fortawesome/free-solid-svg-icons'
import MobileNavMenu from './MobileNavMenu';
import NavMenu from './NavMenu';

const Header = ({ displayCart, totalQuantity, hidden, toggleNavDisplay }) => {
  const singleDigitPosition = {
    right: '0.7em',
  }
  const doubleDigitPosition = {
    right: '0.45em',
  }

  return (
    <div className="header">
      <MobileNavMenu hidden={hidden} toggleNavDisplay={toggleNavDisplay} />
      <Link to="/">
        <div className="header--heading-wrapper">
          <FontAwesomeIcon className="header--heading-icon" icon={faMusic} />
          <h2 className="header--heading">Albumphoria</h2>
        </div>
      </Link>
      <NavMenu />
      <div onClick={displayCart} className="header--cart-icon-container">
        <span className="header--cart-count" style={totalQuantity >= 10 ? doubleDigitPosition : singleDigitPosition}>{totalQuantity}</span>  
        <FontAwesomeIcon className="header--cart-icon" icon={faShoppingCart} />
      </div>
    </div>
  )
}

export default Header;