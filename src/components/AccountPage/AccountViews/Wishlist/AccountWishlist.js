import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getRequest } from '../../../../sevices/service';
import AccountWishlistAlbums from './AccountWishlistAlbums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';

const AccountWishlist = ({ user }) => {

  const [ wishlist, setWishlist ] = useState([]);

  useEffect(() => {
    const getUserWishlist = async (token) => {
      const response = await getRequest('http://localhost:3001/wishlist', token);
      const userWishlist = await response.json();
      setWishlist(userWishlist);
    }
    getUserWishlist(user.token);
  }, [user.token, wishlist.length]);

  return (
    <div className="account__wishlist">
      <div className="account__wishlist--heading-container">
        <FontAwesomeIcon className='account__wishlist--heading-icon' icon={faGift} />
        <h2 className="account__wishlist--heading">My Wishlist</h2>
      </div>
      <AccountWishlistAlbums wishlist={wishlist} />
      <Outlet />
    </div>
  )
}

export default AccountWishlist;