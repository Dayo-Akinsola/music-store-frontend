import AccountOrderAlbum from "./AcccountOrderAlbum";

const AccountOrderMain = ({ order }) => {
  const { albums } = order;

  return (
    <div className="account__order--main">
      {
        albums.map((album) => (
          <AccountOrderAlbum album={album} order={order} key={album.id} />
        ))
      }
    </div>
  )
}

export default AccountOrderMain;