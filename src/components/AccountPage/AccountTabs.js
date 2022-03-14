import { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { setUserContext } from "../../App";
import AccountTab from "./AccountTab";

const AccountTabs = ({ showMobileNavigation, match }) => {
  const setUser = useContext(setUserContext);
  const navigate = useNavigate();

  const logOut = () => {
    setUser({token: null, name: null, username: null, id: null});
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  }

  return (
    <>
    <div className="account__tabs account__desktop-tabs">
      <Link className={`account__tab--link${match ? ' active' : ''}`} to="/account">
        <div className={'account__tab account__tab--overview'}>
          <span className='account__tab--name account__tab--overview'>Account Overview</span>
        </div>
      </Link>
      <AccountTab tabName="My Orders" page='orders' link='orders' /> 
      <AccountTab tabName="My Wishlist" page='wishlist' link='wishlist' /> 
      <AccountTab tabName="My Details" page='details' link='details' />  
      <AccountTab tabName="My Friends" page='friends' link='friends/friendlist' /> 
      <AccountTab tabName="My Reviews" page='reviews' link='reviews' />
      <div onClick={logOut} className={'account__tab account__tab--logout'}>
        <span className='account__tab--name account__tab--logout'>Log Out</span>
      </div>
    </div>
    <div className={`account__tabs ${showMobileNavigation ? 'shown' : 'hidden'}`} >
      <AccountTab tabName="My Orders" page='orders' link='orders' /> 
      <AccountTab tabName="My Wishlist" page='wishlist' link='wishlist' /> 
      <AccountTab tabName="My Details" page='details' link='details' />  
      <AccountTab tabName="My Friends" page='friends' link='friends/friendlist' /> 
      <AccountTab tabName="My Reviews" page='reviews' link='reviews' />
      <div onClick={logOut} className={'account__tab account__tab--logout'}>
        <span className='account__tab--name account__tab--logout'>Log Out</span>
      </div>
    </div>
    </>
  )
}

export default AccountTabs;