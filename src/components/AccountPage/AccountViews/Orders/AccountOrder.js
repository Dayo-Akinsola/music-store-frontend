import AccountOrderHeader from "./AccountOrderHeader";
import AccountOrderMain from "./AccountOrderMain";
import AccountOrderFooter from "./AccountOrderFooter";

const AccountOrder = ({ order }) => {
  return (
    <div className="account__order">
      <AccountOrderHeader order={order} />
      <AccountOrderMain albums={order.albums} />
      <AccountOrderFooter order={order} />
    </div>
  )
}

export default AccountOrder;