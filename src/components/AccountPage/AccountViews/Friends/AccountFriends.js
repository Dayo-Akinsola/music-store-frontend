import { NavLink, Outlet } from "react-router-dom";

const AccountFriends = () => {
  return (
    <div className="account__friends">
      <div className="account__friends--header">
        <h3 className="account__friends--heading">My Friends</h3>
        <nav className="account__friends--nav-bar">
          <NavLink to='friendlist' className="account__friends--nav-friendlist account__friends--nav-link">Friend List</NavLink>
          <NavLink to='requests' className="account__friends--nav-requests account__friends--nav-link">Requests</NavLink>
        </nav>
      </div>
      <Outlet />
    </div>
  )
}

export default AccountFriends;