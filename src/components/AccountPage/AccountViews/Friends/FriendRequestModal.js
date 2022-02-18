import FormSection from "../../../Shared/FormSection";

const FriendRequestModal = () => {
  return (
    <div className="account__friends--friend-request-modal">
      <div className="account__friends--friend-request-modal-content">
        <div className="account__friend-request-modal--header">
          <span className="account__friend-request-modal--header-text">Send a Friend Request</span>
        </div>
        <div className="account__friend-request-modal--main">
          <FormSection 
            name='name'
            className='account__friend-request-modal--name'
            label='name'
            detail=''
            errorMessage=''
            handleInputChange=''
            type='text'
          />
        </div>
      </div>
    </div>
  )
}

export default FriendRequestModal;