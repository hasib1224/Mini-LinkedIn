import React, {useState } from 'react';
import { Button, Modal, Form,  } from 'react-bootstrap';
import axios from 'axios';
import api from '../API/authAPI';
import postAPI from '../API/postAPI';

// import axios from 'axios';

const StartPost = () => {
    const [showModal, setShowModal] = useState(false);
    const [postContent, setPostContent] = useState('');
    const [filedetails, setFiledetails] = useState();
    // const [postType, setPostType] = useState('');

    const accessToken = sessionStorage.getItem('accessToken')


    const handleImageChange = (e) => {
      setFiledetails(e.target.files[0]);
  }
  
    const handlePostClick = () => {
      setShowModal(true);
    };
    const handleOptionClick = (type) => {
        setShowModal(true);
        // setPostType(type);
      };
    const handleModalClose = () => {
      setShowModal(false);
      setPostContent('');
    };
  
    const handlePostSubmit = () => {
  
      console.log('Post content:', postContent)
      console.log('file details:', filedetails)
  
      const formData = new FormData(); 
      formData.append('content', postContent); 
      formData.append('image', filedetails); 

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": 'multipart/form-data'
      }


         
      axios.post(`http://localhost:${process.env.REACT_APP_postPort|8002}/posts/createPost`,formData, {
      // postAPI.post('/createPost', formData, {
          headers :headers        
      })
      .then((response) =>{
          console.log(response)
      })
      .catch((error) =>{
          console.log("cannot create post : " + error)
      })
      handleModalClose();
    };

    
    return(
        <>
        <div className="start-post-area bg-light border-rounded" onClick={handlePostClick} 
          style={{height : '10%',marginTop:'30px', marginBottom:'20px', borderRadius:'10px',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',}}>
            <Form className='d-flex justify-content-center'>
                <Form.Group controlId="postContent">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Start a post..."
                        style={{height:'60px', 
                                width:'500px',
                                border:'rounded',
                                borderRadius:'50px',
                                marginTop:'10px'                           
                            }}
                        // onChange={handleContentChange}
                    />
                </Form.Group>
            
            </Form> 
            
            <div className="post-options mt-4 d-flex justify-content-between">

                <Button variant="default"  onClick={() => handleOptionClick('photo')} className="flex-fill hover-dark">
                <i class="fa-regular fa-image"></i>
                <span class="badge rounded-pill badge-notification" style={{ position: 'relative', color:'black' }}>Photo</span>
                </Button>

                <Button variant="default " style={{marginLeft:'10px', marginRight:'5px'}} onClick={() => handleOptionClick('video')} className="flex-fill">
                <i class="fa-sharp fa-solid fa-circle-play"></i>
                <span class="badge rounded-pill badge-notification" style={{ position: 'relative', color:'black' }}>Video</span>
                </Button>

                <Button variant="default" style={{marginLeft:'5px', marginRight:'5px'}}onClick={() => handleOptionClick('event')} className="flex-fill">
                <i class="fa-solid fa-calendar-days"></i>
                <span class="badge rounded-pill badge-notification" style={{ position: 'relative', color:'black' }}>Event</span>
                </Button>

                <Button variant="default" style={{marginLeft:'5px', marginRight:'5px'}}onClick={() => handleOptionClick('article')} className="flex-fill">
                 <i class="fa-duotone fa-newspaper"></i>
                <span class="badge rounded-pill badge-notification" style={{ position: 'relative', color:'black' }}>Write Article</span>
                </Button>

            </div>

        </div>
        <Modal show={showModal} onHide={handleModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create a Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="postContent">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Write your post here..."
                />
              </Form.Group>

              <Form.Group controlId="postImage">
                <Form.Label>Upload an Image</Form.Label>
                <Form.Control
                  type="file"
                  name = "image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handlePostSubmit}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default StartPost;