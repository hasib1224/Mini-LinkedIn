import axios from 'axios'
import { useState } from 'react';
import authAPI from '../API/authAPI';
const UserProfile = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const accessToken = sessionStorage.getItem('accessToken');

  authAPI.get('/getUserProfile', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then((response) => {
      console.log("posts : ", response.data);
      setUsername(response.data.username)
      setEmail(response.data.email)
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });

  return (
    <>
      <div className="bg-light d-flex flex-direction-column align-items-center justify-content-center"
        style={{
          marginLeft: '10px',
          marginTop: '30px',
          height: '300px',
          width: '95%',
          padding: '10px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }}>
        <div>
          <h1>{username}</h1>
          <p>{email}</p>
        </div>
      </div>


    </>
  )
}
export default UserProfile
