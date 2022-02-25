import { NavLink } from "react-router-dom";

const ProfileNav = ({ name }) => {

  return (
    <li className="profile-page__header--profile-nav">
      <NavLink to={name} className="profile-page__header--profile-nav-link">{`${name.slice(0, 1).toUpperCase()}${name.slice(1)}`}</NavLink>
    </li>
  )
}

export default ProfileNav;