import NavOptions from "./NavOptions";

const NavMenu = () => {
  return (
    <div className="header__nav-menu">
      <nav>
        <ul className="header__nav-menu-options">
          <NavOptions />
        </ul>
      </nav>
    </div>
  )
 
}

export default NavMenu;