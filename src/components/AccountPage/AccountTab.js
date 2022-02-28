import { NavLink } from "react-router-dom";

const AccountTab = ({ tabName, page, link}) => {
  return (
      <NavLink className='account__tab--link' to={link}>
        <div className={`account__tab account__tab--${page}`}>
          <span className={`account__tab--name account__tab--name${page}`}>{tabName}</span>
        </div>
      </NavLink>
  )
}

export default AccountTab;