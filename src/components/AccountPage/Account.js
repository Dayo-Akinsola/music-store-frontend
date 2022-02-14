import { Outlet } from "react-router-dom";
import AccountHeader from "./AccountHeader";
import AccountTabs from "./AccountTabs";

const Account = ({ user }) => {
  if (user.token) {
    return (
      <div className="account">
        <AccountHeader user={user} />
        <AccountTabs />
        <Outlet />
      </div>
    )
  }
  return null;
}

export default Account;