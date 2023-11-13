import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Dropdown, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import notificationAPI from '../API/notificationAPI';
import Notifications from '../Notification/notifications';
import './Header.css'

const Header = () => {
  // return (
  //     <Navbar bg="dark" variant="dark" expand="lg">
  //     <Container>
  //       <Navbar.Brand>My App</Navbar.Brand>
  //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //       <Navbar.Collapse id="basic-navbar-nav">
  //         <Nav className="me-auto">
  //           <Nav.Link as={Link} to="/Homepage">
  //             Homepage
  //           </Nav.Link>
  //           <Nav.Link as={Link} to="/Notifications">
  //             Notifications
  //           </Nav.Link>
  //         </Nav>
  //         <Nav>
  //           <Nav.Link as={Link} to="/Login">
  //             Logout
  //           </Nav.Link>
  //         </Nav>
  //       </Navbar.Collapse>
  //     </Container>
  //   </Navbar>
  // )

  const navigate = useNavigate()
  const [showNotifcation, setShowNotifcation] = useState(false)
  const [notifications, setNotifications] = useState('')
  const [numberOfNotifications, setNumberOfNotifications] = useState(0)

  useEffect(() => {
    // Fetch notifications from the server
    const accessToken = sessionStorage.getItem('accessToken')

    // axios.get('http://localhost:5000/notifications/getNotifications', {
    notificationAPI.get('/getNotifications',{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        setNotifications(response.data)
        setNumberOfNotifications(notifications.length)
      })
      .catch((error) => {
        console.log('Error fetching notifications:', error);
      });
  }, [notifications]);

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/Login');
  }

  const handleShowNotifications = () => {
    // setShowNotifcation(true)
    setShowNotifcation((prevShowNotification) => !prevShowNotification);

    // fetchNotifications();
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="btn btn-link text-reset me-3"
    >
      {children}
    </button>
  ));
  const handleLinkedIn = () => {
    navigate('/Homepage')
  }



  return (

    // <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light"
      style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', }}
    >
      {/* <!-- Container wrapper --> */}
      <div class="container-fluid">


        {/* <!-- Collapsible wrapper --> */}
        <div class="collapse navbar-collapse linkedin-icon" style={{ marginLeft: "100px" }} >
          <i class="fa-brands fa-linkedin fa-2xl" onClick={() => handleLinkedIn()} style={{ marginLeft: '40px', color: '#1751b5', cursor: 'pointer', }}></i>
        </div>
        {/* <!-- Collapsible wrapper --> */}

        {/* <!-- Right elements --> */}
        <div class="d-flex align-items-center">

          {/* <!-- Notifications --> */}
          <button className="btn btn-link text-reset me-3" onClick={handleShowNotifications}>
            <i className="fas fa-bell fa-2xl"></i>
            <span className="badge rounded-pill badge-notification bg-danger" style={{ position: 'relative', top: '-15px', right: '8px' }}>
              {numberOfNotifications}
            </span>
          </button>
          {showNotifcation && <Notifications />}


          {/* <!-- Profile --> */}
          <Dropdown>
            <Dropdown.Toggle as={Button} id="profile-dropdown">
              <i class="fa-solid fa-user fa-2xl" style={{ color: '#1c3754' }}></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </div>
        {/* <!-- Right elements --> */}
      </div>
      {/* <!-- Container wrapper --> */}
    </nav>
    // <!-- Navbar -->
  )
}

export default Header




