/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { getRequest } from '../../../../sevices/service';
import FriendSearchResult from './FriendSearchResult';

const FriendSearch = ({ user, setModalOpen}) => {

  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await getRequest('http://localhost:3001/friends/all', user.token);
      const allUsers = await response.json();
      const selfRemovedFromUsers = allUsers.filter(searchUser => searchUser.id !== user.id);
      setUsers(selfRemovedFromUsers.map(userInfo => {
        const info = {
          ...userInfo,
          shown: false,
          sentRequest: false,
        }
        return info;
      }));
    }
    getAllUsers();
  }, [user.token]);

  useEffect(() => {
    const searchMatcher = () => {
      const usersToShow = users.map(user => {
        if (searchText.length !== 0 && user.name.toLowerCase().includes(searchText.toLowerCase())) {
          user.shown = true;
        } else {
          user.shown = false;
        }
        return user;
      });
      setUsers(usersToShow);
    }

    searchMatcher();
  }, [searchText]);

  const searchInputHandler = (event) => {
    setSearchText(event.target.value);
  } 

  return (
    <div className="account__friends--friend-request-modal">
      <div className="account__friends--friend-request-modal-content">
        <div className="account__friend-request-modal--header">
          <span className="account__friend-request-modal--header-text">Send a Friend Request</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="account__friend-request-modal--header-close" viewBox="0 0 320 512" onClick={() => setModalOpen(false)}>
            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
          </svg>
        </div>
        <div className="account__friend-request-modal--main">
          <div className="account__friend-request-modal--search-bar-wrapper">
            <input 
              type="text" 
              placeholder="Search for a user" 
              className="account__friend-request-modal--search-bar" 
              value={searchText} 
              onChange={searchInputHandler} 
            />
          </div>
          <div className="account__friend-request-modal--results-container">
            <div className="account__friend-request-modal--results-heading-wrapper">
              <span className="account__friend-request-modal--results-heading">Users</span>
            </div>
            <div className="account__friend-request-modal--results">
              {
                users.map((searchResultUser) => {
                  if (searchResultUser.shown) {
                    return (
                      <FriendSearchResult key={searchResultUser.id} user={user} searchResultUser={searchResultUser} users={users} setUsers={setUsers} />
                    )
                  }
                  return null;
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendSearch;