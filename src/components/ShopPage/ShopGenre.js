import { NavLink } from "react-router-dom";

const ShopGenre = ({ genre }) => {
  return (
    <li className="shop__genre">
      {
        genre !== 'hiphop' ?
          <NavLink to={`/shop/${genre}/?page=1`}>{`${genre.slice(0, 1).toUpperCase()}${genre.slice(1)}`}</NavLink>
          :
          <NavLink to={"/shop/hip-hop/?page=1"}>Hip Hop</NavLink>
      }
    </li>
  )
}

export default ShopGenre;