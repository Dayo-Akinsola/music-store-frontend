import { Link } from "react-router-dom";

const Friend = ({ friendInfo, page }) => {
  return (
    <div key={friendInfo.id} className={`${page}__friend-list--friend`}>
      <div className={`${page}__friend-list--profile-pic`}>
        <span className={`${page}__friend-list--profile-pic-text`}>{friendInfo.name.slice(0, 2)}</span>
      </div>
      <div className={`${page}__friend-list--details`}>
        <span className={`${page}__friend-list--name`}>{friendInfo.name}</span>
        <Link to={`/profile/${friendInfo.id}`}>
          <button className={`${page}__friend-list--profile-btn`}>View Profile</button>
        </Link>
      </div>
    </div>   
  )
}

export default Friend;