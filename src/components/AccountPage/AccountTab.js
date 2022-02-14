import { Link } from "react-router-dom";

const AccountTab = ({ tabName, className, link}) => {
  return (
      <Link className='account__tab--link' to={link}>
        <div className={`account__tab account__tab--${className}`}>
          <span className={`account__tab--name account__tab--name${className}`}>{tabName}</span>
        </div>
      </Link>
  )
}

export default AccountTab;