import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { getRequest } from '../../../../sevices/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import WishlistAlbums from '../../../Shared/WishlistAlbums';

const AccountWishlist = ({ user }) => {
  const [ notificationShowing, setNotificationShowing ] = useState(false);
  const { state } = useLocation();
  const [ wishlist, setWishlist ] = useState([]);
  useEffect(() => {
    const getUserWishlist = async (token) => {
      const response = await getRequest('http://localhost:3001/wishlist', token);
      const userWishlist = await response.json();
      setWishlist(userWishlist);
    }
    getUserWishlist(user.token);
  }, [user.token, wishlist.length, state]);

  useEffect(() => {
    const showNotification = async () => {
      if (state && state.message) {
        setNotificationShowing(true);
        setTimeout(() => {
          state.message = '';
          setNotificationShowing(false);
        }, 2000)
      }
    }
    showNotification();
  });

  return (
    <div className="account__wishlist">
      <div className="account__wishlist--heading-container">
        <FontAwesomeIcon className='account__wishlist--heading-icon' icon={faGift} />
        <h2 className="account__wishlist--heading">My Wishlist</h2>
      </div>
      {
        notificationShowing && state && state.message ?
          <div className="account__wishlist--notification-wrapper">
            <span className="account--wishlist--notification">{state.message}</span>
          </div>
          :
          null
      }
      <WishlistAlbums wishlist={wishlist} page="account" />
      <Outlet />
    </div>
  )
}

export default AccountWishlist;