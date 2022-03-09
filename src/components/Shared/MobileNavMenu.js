import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import NavOptions from './NavOptions';

const NavMenu = ({ hidden, toggleNavDisplay }) => {
  const navDisplay = {
    display: `${hidden ? 'none' : 'block'}`,
  }

  return (
    <div className="header__mobile-nav-menu">
      <button className={`header__mobile-nav-menu--btn${hidden ? '' : ' active'}`} onClick={toggleNavDisplay}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <nav>
        <ul className="header__mobile-nav-menu--options" style={navDisplay}>
          <NavOptions />
        </ul>
      </nav>
    </div>
  )
}

export default NavMenu;