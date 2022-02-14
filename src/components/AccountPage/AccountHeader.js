const AccountHeader = ({ user }) => {
  return (
    <div className="account__header">
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
  )
}

export default AccountHeader;