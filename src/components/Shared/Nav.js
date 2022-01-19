import NavLink from '../Shared/NavLink';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <ul className="header__nav">
      <Link to='/'>
        <NavLink linkName='Home' />     
      </Link>
      <Link to='/shop/all'>
        <NavLink linkName='Shop' />     
      </Link>
      <NavLink linkName='About' />     
    </ul>
  )
}

export default Nav;