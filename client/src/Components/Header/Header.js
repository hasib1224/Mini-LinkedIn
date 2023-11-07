import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Notifications from "../Notification/notifications";
import "./Header.css";

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

  const navigate = useNavigate();
  const [showNotifcation, setShowNotifcation] = useState(false);
  const [numberOfNotifications, setNumberOfNotifications] = useState(0);

  useEffect(() => {
    // Fetch notifications from the server
    const accessToken = sessionStorage.getItem("accessToken");

    axios
      .get("http://localhost:5000/notifications/getNotifications", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const notifications = response.data;
        setNumberOfNotifications(notifications.length);
      })
      .catch((error) => {
        console.log("Error fetching notifications:", error);
      });
  }, []);

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/Login");
  };

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
    navigate("/Homepage");
  };

  return (
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light"
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div class="container-fluid">
        <div
          class="collapse navbar-collapse linkedin-icon"
          style={{ marginLeft: "40px" }}
        >
          <i
            class="fa-brands fa-linkedin fa-2xl"
            onClick={() => handleLinkedIn()}
            style={{ marginLeft: "4px", color: "#1751b5", cursor: "pointer" }}
          ></i>
        </div>

        <div class="d-flex align-items-center">
          <button
            type="button"
            className="btn btn-primary position-relative"
            onClick={handleShowNotifications}
          >
            Notification
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {numberOfNotifications}
            </span>
          </button>
          {showNotifcation && <Notifications />}

          &nbsp;&nbsp;&nbsp;&nbsp;
          <button type="button" class="btn btn-primary" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
    // <!-- Navbar -->
  );
};

export default Header;
