import AccountOrderAlbum from "./AcccountOrderAlbum";

const AccountOrderMain = ({ albums }) => {
  return (
    <div className="account__order--main">
      {
        albums.map((album) => (
          <AccountOrderAlbum album={album} key={album.id} />
        ))
      }
    </div>
  )
}

export default AccountOrderMain;