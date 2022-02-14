import AccountTab from "./AccountTab";

const AccountTabs = () => {
  return (
    <div className="account__tabs">
      <AccountTab tabName="My Orders" className='orders' link='orders' /> 
      <AccountTab tabName="My Wishlist" className='wishlist' link='/wishlist' /> 
      <AccountTab tabName="My Details" className='details' link='/details' />  
      <AccountTab tabName="My Friends" className='friends' link='/friends' /> 
    </div>
  )
}

export default AccountTabs;