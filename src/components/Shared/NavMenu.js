import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const NavMenu = ({ hidden, toggleNavDisplay, user }) => {

  const navDisplay = {
    display: `${hidden ? 'none' : 'block'}`,
  }

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  }

  return (
    <div className="header__nav-menu">
      <button className={`header__nav-menu--btn${hidden ? '' : ' active'}`} onClick={toggleNavDisplay}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <nav>
        <ul className="header__nav-menu--options" style={navDisplay}>
          {
            !user.token ?
            <NavLink className="header__nav-menu--link" to="/login">
              <li className="header__nav-menu--option login-option">Login/Register</li>
            </NavLink>
            :
            <NavLink className="header__nav-menu--link" to="/account">
              <li className="header__nav-menu--option logged-option">Account</li>
            </NavLink>
          }       
          <NavLink className="header__nav-menu--link"to='/'>
            <li className="header__nav-menu--option">Home</li>
          </NavLink>
          <NavLink className="header__nav-menu--link"to='/shop/all/?page=1'>
            <li className="header__nav-menu--option">Shop All</li>
          </NavLink>
          <NavLink className="header__nav-menu--link"to='/shop/pop/?page=1'>
            <li className="header__nav-menu--option">Pop</li>
          </NavLink>
          <NavLink className="header__nav-menu--link"to='/shop/rock/?page=1'>
            <li className="header__nav-menu--option">Rock</li>
          </NavLink>
          <NavLink className="header__nav-menu--link"to='/shop/hip-hop/?page=1'>
            <li className="header__nav-menu--option">Hip Hop</li>
          </NavLink>
          <NavLink className="header__nav-menu--link"to='/shop/electronic/?page=1'>
            <li className="header__nav-menu--option">Electronic</li>
          </NavLink>
          <NavLink className="header__nav-menu--link"to='/shop/jazz/?page=1'>
            <li className="header__nav-menu--option">Jazz</li>
          </NavLink>
          <NavLink className="header__nav-menu--link"to='/shop/popular/?page=1'>
            <li className="header__nav-menu--option">Popular</li>
          </NavLink>
          <li className="header__nav-menu--option" onClick={scrollToBottom}>About</li>
        </ul>
      </nav>
    </div>
  )
}

export default NavMenu;