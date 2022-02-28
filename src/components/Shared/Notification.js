/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
const Notification = ({ notification, setNotification}) => {

  useEffect(() => {
    const resetNotification = () => {
      setTimeout(() => {
        setNotification('');
      }, 10000)
    }

    resetNotification();
  }, [notification])
  return (
    <div className="notification-wrapper" style={{'display' : `${notification === '' ? 'none' : 'block'}`}}>
      <span className="notification-message">{notification}</span>
    </div>
  )
}

export default Notification;