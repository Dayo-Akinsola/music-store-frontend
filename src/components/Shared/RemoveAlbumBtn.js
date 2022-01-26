import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const RemoveAlbumBtn = ({ removeCartAlbum, cartAlbum }) => {
  return (
    <span onClick={() => removeCartAlbum(cartAlbum)} className="cart-sidebar__cart-album--remove">
      <FontAwesomeIcon icon={faTimesCircle} />
    </span>
  )
}

export default RemoveAlbumBtn;