import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import UserProfile from "../User/UserProfile";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../Header/Header";

// import axios from 'axios';

const NotificationPost = () => {
  const location = useLocation();
  const [post, setPost] = useState({});

  const notification = location.state?.notification;
  const accessToken = sessionStorage.getItem("accessToken");

  console.log("NotificationPost : ", notification);

  useEffect(() => {
    axios
      .get("http://localhost:5000/notifications/getNotifiedPost", {
        params: notification, // Send the notification as a query parameter
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log("Error fetching strings:", error);
      });
  }, [post]);

  return (
    <>
      <Header />
      <div>
        <Container
          className="align-items-center"
          style={{ height: "auto", minHeight: "100vh", width: "80%" }}
        >
          {/* backgroundColor: '#e6e6e6' */}
          <Row>
            <Col md={3}>{/* <UserProfile /> */}</Col>

            <Col
              style={{
                marginTop: "80px",
                marginLeft: "10px",
                marginRight: "10px",
                height: "100%",
              }}
              md={6}
            >
              {/* <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }} md={6}> */}
              <div style={{ marginTop: "20px" }}>
                <div>
                  <div
                    className="border rounded bg-light"
                    style={{
                      marginBottom: "20px",
                      borderColor: "gray",
                      borderRadius: "10px",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                  >
                    <h1 style={{ textAlign: "" }}>Post</h1>
                    <hr />

                    <div className="text-box" style={{ marginLeft: "10px" }}>
                      <p
                        style={{
                          textAlign: "left",
                          marginBottom: "5px",
                          fontSize: "18px",
                        }}
                      >
                        <strong>{post.username}</strong>
                      </p>
                      <p
                        style={{
                          textAlign: "left",
                          fontFamily: "fantasy",
                          fontSize: "14px",
                          color: "gray",
                          marginBottom: "10px",
                        }}
                      >
                        {post.email}
                      </p>
                      <pre
                        style={{
                          textAlign: "left",
                          whiteSpace: "pre-wrap",
                          fontSize: "16px",
                        }}
                      >
                        {post.content}
                      </pre>
                    </div>

                    {post.imageId && (
                      <img
                        src={`http://127.0.0.1:9000/linkedin/${post.imageId}`}
                        style={{ width: "100%", height: "auto" }}
                        alt="Post"
                      />
                    )}
                  </div>
                </div>
              </div>
            </Col>

            <Col></Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default NotificationPost;
