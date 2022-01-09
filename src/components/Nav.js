import NavLink from './NavLink';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <ul className="header__nav">
      <Link to='/'>
        <NavLink linkName='Home' />     
      </Link>
      <Link to='/shop'>
        <NavLink linkName='Shop' />     
      </Link>
      <NavLink linkName='About' />     
    </ul>
  )
}

export default Nav;