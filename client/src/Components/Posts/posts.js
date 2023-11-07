import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const accessToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    
    axios.get('http://localhost:5000/posts/getPost',{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
    })
      .then((response) => {
        setPosts(response.data);
        console.log("posts : ", response.data);
      })
      .catch((error) => {
        console.log('Error fetching strings:', error);
      });
  }, []);

  return (
  //   <div style={{marginTop:'20px'}}>
  //   {posts.map((post) => (
  //     <div className='border rounded bg-light' key={post.id} style={{ marginBottom: '20px' }}>
  //         {/* <h3>Post ID: {post._id}</h3> */}
  //         <p className='bg-dark'  style={{ textAlign: 'left'}}>{post.username}</p>
  //         <p className='bg-dark'   style={{ textAlign: 'left'}}>{post.email}</p>
  //         <pre className='bg-dark' style={{ textAlign: 'left'}}>Content: {post.content}</pre>
  //     </div>
  //   ))}
  // </div>
      <div style={{ marginTop: '20px' }}>
      {posts.map((post) => (
        <div>
          <div className='border rounded bg-light' key={post.id} 
          style={{ marginBottom: '20px', borderColor:"gray",  borderRadius:'10px',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',}}>
            <div className='text-div' style={{marginLeft:'20px'}}>
                <p style={{ 
                  textAlign: 'left', 
                  marginBottom: '5px',
                  fontSize :'18px'
                  
                  }}>
                    <strong>{post.username}</strong>
                </p>
                  <p style={{ 
                    textAlign: 'left', 
                    fontSize: '14px',
                    color: 'gray', 
                    marginBottom: '10px' }}>
                    {post.email}
                </p>
                <pre style={{ 
                  textAlign: 'left', 
                  whiteSpace: 'pre-wrap',
                  fontFamily:'arial', fontSize:'16px' 
                  }}>
                    {post.content}</pre>
                  </div>

                  {/* -------------------------Image ------------------------*/}
                {post.imageId && <img 
                    src={`http://127.0.0.1:9000/linkedin/${post.imageId}`}
                    style={{ width: '100%', height: 'auto', }}
                    alt="Post"
                />}

                <div style={{height:'20px'}}>

                </div>

          </div>   
          <hr/>
        </div>
      ))}
    </div>

  );
};

export default Posts;
