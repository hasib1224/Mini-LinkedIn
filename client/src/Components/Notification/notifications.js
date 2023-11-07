import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import './notification.css'

const Notifications = () => {
  const navigate = useNavigate()

  const [notifications, setNotifications] = useState([]);
  const [post, setPost] = useState({});
  const accessToken = sessionStorage.getItem('accessToken');


  useEffect(() => {
    // Fetch notifications from the server

    axios.get('http://localhost:5000/notifications/getNotifications', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        setNotifications(response.data);
        console.log("notifications : ", response.data);
        console.log("notifications : ", notifications)
      })
      .catch((error) => {
        console.log('Error fetching notifications:', error);
      });
  }, []);

  const changeNotificationStatus = (notification) => {
    console.log('notification : ', notification)
    axios.post('http://localhost:5000/notifications/setNotificationStatus', notification, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log('Error changing notification :', error);
      });
  };

  const handleNotificationClick = (notification) => {

    console.log('notification : ', notification)
    navigate('/NotificationPost', {state:{notification}});

    // useEffect to log the updated post value
  }



  return (
    <>
      <div className="notification-popup" style={{
        marginTop:'30px',borderRadius:'10px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        }}>
        <h2>Notifications</h2>
        <hr/>
        {notifications.map((notification) => {

          if (!notification.seen) {
            return (
              <div style={{ display: 'flex',marginBottom:'3px',}}>
                <div>
                <input
                      type="checkbox"
                      // checked={checkboxValue}
                      onChange={() => changeNotificationStatus(notification)}
                      style={{ marginRight: '10px' }}
                    />
                </div>
                <div
                  className='notifications'
                  style = {{width:'100%'}}
                  key={notification.id}
                  onClick={() => {
                    // changeNotificationStatus(notification);
                    handleNotificationClick(notification)
                  }}
                >
                  <p style={{
                    textAlign: 'left',
                    fontFamily: 'sans-serif'
                  }}>
                    <strong>{notification.username}</strong> added a new post
                  </p>
                </div>
              </div>
            );
          }
          return null;
        }
        )}
      </div>
    </>
  );
};



export default Notifications