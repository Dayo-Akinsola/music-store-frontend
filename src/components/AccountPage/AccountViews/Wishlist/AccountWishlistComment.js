import { useState , useContext } from "react";
import { dataChangeRequest, getRequest } from "../../../../sevices/service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../../App";

const AccountWishlistComment = ({ album }) => {
  const user = useContext(UserContext);
  const [ editMode, setEditMode ] = useState(false);
  const [ comment, setComment ] = useState(album.comment);

  const editComment = async () => {
    const newAlbumComment = {
      albumId: album.albumId,
      comment,
    }
    await dataChangeRequest('https://albumphoria.herokuapp.com/wishlist', newAlbumComment, user.token, 'PUT');
    const response = await getRequest(`https://albumphoria.herokuapp.com/wishlist/${album._id.toString()}`, user.token);
    const editedAlbum = await response.json();
    setComment(editedAlbum.comment);
    setEditMode(false);
  }

  const cancelEdit = async () => {
    const response = await getRequest(`https://albumphoria.herokuapp.com/wishlist/${album._id.toString()}`, user.token);
    const currentAlbum = await response.json();
    setComment(currentAlbum.comment);
    setEditMode(false);
  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  const textAreaChangeHandler = (event) => {
    setComment(event.target.value);
  }

 
  return  (
    <div className="account__wishlist--your-album-comment-wrapper">
      <div className="account__wishlist--your-alblum-comment-header">
        <h4 className="account__wishlist--your-album-comment-heading">Comment</h4>
        <FontAwesomeIcon icon={faPen} className="account__wishlist--add-edit-comment-btn" onClick={toggleEditMode} />
      </div>
      {
        editMode ?
          <>
            <textarea 
              name="comment" 
              className="account__wishlist--your-album-comment-input" 
              onChange={(event) => textAreaChangeHandler(event)} value={comment} >
            </textarea>
            <div className="account__wishlist--your-album-comment-input-btn-wrapper">
              <button className="account__wishlist--your-album-comment-input-cancel" onClick={cancelEdit}>Cancel</button>
              <button className="account__wishlist--your-album-comment-input-submit" onClick={editComment}>Confirm</button>
            </div>
          </>
        
          :
          <span className="account__wishlist--your-album-comment">{comment}</span>
      }
    </div>  
  )
}

export default AccountWishlistComment;