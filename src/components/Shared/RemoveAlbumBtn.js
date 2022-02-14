import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const RemoveAlbumBtn = ({ removeCartAlbum, cartAlbum, classNamePrefix }) => {
  return (
    <span onClick={() => removeCartAlbum(cartAlbum.id)} className={`${classNamePrefix}--remove`}>
      <FontAwesomeIcon icon={faTimesCircle} />
    </span>
  )
}

export default RemoveAlbumBtn;