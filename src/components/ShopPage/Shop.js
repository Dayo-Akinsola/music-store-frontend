import Albums from "./Albums";
import { NavLink } from 'react-router-dom';

const Shop = ({ albums, category }) => {
  const setClassName = (isActive, category) => {
    const activeStatus = isActive ? ' active' : '';
    const className = `shop__category shop__categories--${category}${activeStatus}`;
    return className;
  }

  return (
    <>
      <div className="shop">
        <div className="shop__categories">
          <NavLink className={({ isActive }) => setClassName(isActive, 'all')} to='/shop/all'>
            All
          </NavLink> 
          <NavLink className={({ isActive }) => setClassName(isActive, 'pop')} to='/shop/pop'>
            Pop
          </NavLink>
          <NavLink className={({ isActive }) => setClassName(isActive, 'hiphop')} to='/shop/hip-hop'>
            Hip Hop
          </NavLink>
          <NavLink className={({ isActive }) => setClassName(isActive, 'electronic')} to='/shop/electronic'>
            Electronic
          </NavLink>
          <NavLink className={({ isActive }) => setClassName(isActive, 'rock')} to='/shop/rock'>
            Rock
          </NavLink>
          <NavLink className={({ isActive }) => setClassName(isActive, 'jazz')} to='/shop/jazz'>
            Jazz
          </NavLink>
        </div>
        <div className="shop__current-category-wrapper">
          <h2 className="shop__current-category">{category}</h2>
        </div>
        <Albums albums={albums} />
      </div>
    </>
  )
}

export default Shop;