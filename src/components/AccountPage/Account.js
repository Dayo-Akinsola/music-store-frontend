import { useState, useEffect, useContext } from 'react';
import { Outlet, useMatch, Link } from "react-router-dom";
import AccountHeader from "./AccountHeader";
import AccountTabs from "./AccountTabs";
import { UserContext } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
const Account = () => {
  const user = useContext(UserContext);
  const [showMobileNavigation, setShowMobileNavigation] = useState(true);
  const match = useMatch('/account');

  useEffect(() => {
    const setMobileNavView = () => {
      if (!match) {
        setShowMobileNavigation(false);
      } else {
        setShowMobileNavigation(true);
      }
    }

    setMobileNavView();
  }, [match]);

  if (user.token) {
    return (
      <>
      <div className="account">
        <div className="account__navigation">
          <AccountHeader showMobileNavigation={showMobileNavigation} />
          <AccountTabs showMobileNavigation={showMobileNavigation} match={match} />
        </div>
        <div className={`account__return ${showMobileNavigation ? 'hidden' : 'shown'}`}>
          <Link to="/account" className="account__return--link">
            <FontAwesomeIcon className="account__return--arrow" icon={faChevronLeft} />
            <i className="gg-profile"></i>
          </Link>
          <span className="account__return--title">Account</span>
        </div>
        <Outlet />
      </div>
      </>

    )
  }
  return null;
}

export default Account;