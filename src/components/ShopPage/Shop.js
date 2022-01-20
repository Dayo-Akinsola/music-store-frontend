import Albums from "./Albums";
import { NavLink } from 'react-router-dom';

const Shop = ({ albums, genre }) => {
  const setClassName = (isActive, genre) => {
    const activeStatus = isActive ? ' active' : '';
    const className = `shop__genre shop__genres--${genre}${activeStatus}`;
    return className;
  }

  return (
    <>
      <div className="shop">
        <div className="shop__genres">
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
        <div className="shop__current-genre-wrapper">
          <h2 className="shop__current-genre">{genre}</h2>
        </div>
        <Albums albums={albums} />
      </div>
    </>
  )
}

export default Shop;