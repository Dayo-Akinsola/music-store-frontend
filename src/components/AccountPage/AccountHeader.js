import { useContext } from 'react';
import { UserContext } from "../../App";
const AccountHeader = ({ showMobileNavigation}) => {

  const user = useContext(UserContext);

  return (
    <>
    <div className="account__header account__desktop-header">
      <div className="account__header--top-section account__desktop-header--top-section"></div>
      <div className="account__header--bottom-section account__desktop-header--bottom-section">
        <div className="account__header--profile-pic account__desktop-header--profile-pic">
          <h1 className="account__header--profile-pic-text-section account__desktop-header--profile-pic-text-section">
            <span className="account__header--greeting account__desktop-header--greeting">Hi, {user.name}</span>
            {user.name.slice(0, 2)}
          </h1>
        </div>
        <div className="account__header--welcome account__desktop-header--welcome">
          <span className="account__header--welcome-top account__desktop-header--welcome-top">Hi,</span>
          <span className="account__header--welcome-bottom account__desktop-header--welcome-bottom">{user.name}</span>
        </div>
      </div>
    </div>
    <div className={`account__header ${showMobileNavigation ? 'shown' : 'hidden'}`} >
      <div className="account__header--top-section"></div>
      <div className="account__header--bottom-section">
        <div className="account__header--profile-pic">
          <h1 className="account__header--profile-pic-text-section">
            <span className="account__header--greeting">Hi, {user.name}</span>
            {user.name.slice(0, 2)}
          </h1>
        </div>
        <div className="account__header--welcome">
          <span className="account__header--welcome-top">Hi,</span>
          <span className="account__header--welcome-bottom">{user.name}</span>
        </div>
      </div>
    </div>
    </>
  )
}

export default AccountHeader;