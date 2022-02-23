import { NavLink } from "react-router-dom";

const ProfileNav = ({ name }) => {

  return (
    <li className="profile-page__header--profile-nav">
      <NavLink to={name} className="profile-page__header--profile-nav-link">{name}</NavLink>
    </li>
  )
}

export default ProfileNav;