import { useContext } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { UserContext } from "../../App";
const NavOptions = () => {
  const user = useContext(UserContext);
  const location = useLocation();

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  }

  const pathCheck = (pathParam) => {
    return location.pathname.split('/').includes(pathParam);
  }

  return (
    <>
    {
    !user.token ?
      <Link className={`header__nav-menu--link${pathCheck('login') || pathCheck('register') ? ' active' : ''}`} to="/login">
        <li className="header__nav-menu--option login-option">Login/Register</li>
      </Link>
      :
      <NavLink className="header__nav-menu--link" to="/account">
        <li className="header__nav-menu--option logged-option">Account</li>
      </NavLink>
    }       
    <NavLink className="header__nav-menu--link"to='/'>
      <li className="header__nav-menu--option">Home</li>
    </NavLink>
    <Link className={`header__nav-menu--link${pathCheck('shop') && !pathCheck('popular') ? ' active' : ''}`} to='/shop/all/?page=1'>
      <li className="header__nav-menu--option">Shop</li>
    </Link>
    <NavLink className="header__nav-menu--link"to='/shop/popular/?page=1'>
      <li className="header__nav-menu--option">Popular</li>
    </NavLink>
    <li className="header__nav-menu--option" onClick={scrollToBottom}>About</li>
    </>
  )
}

export default NavOptions;