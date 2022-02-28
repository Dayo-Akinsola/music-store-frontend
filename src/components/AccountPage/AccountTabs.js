import AccountTab from "./AccountTab";

const AccountTabs = () => {
  return (
    <div className="account__tabs">
      <AccountTab tabName="My Orders" page='orders' link='orders' /> 
      <AccountTab tabName="My Wishlist" page='wishlist' link='wishlist' /> 
      <AccountTab tabName="My Details" page='details' link='details' />  
      <AccountTab tabName="My Friends" page='friends' link='friends/friendlist' /> 
      <AccountTab tabName="My Reviews" page='reviews' link='reviews' />
    </div>
  )
}

export default AccountTabs;