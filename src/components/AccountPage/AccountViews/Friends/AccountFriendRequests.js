/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { getRequest } from "../../../../sevices/service";
import FriendRequest from "./FriendRequest";

const AccountFriendRequests = ({ user }) => {
  const [requests, setRequests] = useState([]);

  const getFriendRequests = async () => {
    const response = await getRequest('http://localhost:3001/friends/request/received', user.token);
    const receivedRequests = await response.json();
    setRequests(receivedRequests.map(request => request));
  }

  useEffect(() => {
    getFriendRequests();
  }, []);

  return (
    <div className="account__friends--requests">
      <div className="account__friends--requests-header">
        <h4 className="account__friends--requests-heading">Requests</h4>
      </div>
      <div className="account__friends--received-requests">
        {
          requests.map((request) => (
            <FriendRequest request={request} user={user} getFriendRequests={getFriendRequests} key={request.id} />
          ))
        }
      </div>
    </div>
  )
}

export default AccountFriendRequests;