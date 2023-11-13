import Header from "../Header/Header"
import Posts from "../Posts/posts"
import UserProfile from './UserProfile'
import startPost from "../Posts/startPost";
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import StartPost from "../Posts/startPost";
import postAPI from "../API/postAPI";



const Homepage = () =>{

    const [content,setContent] = useState('')

    const onValueChange = (e) => {
        setContent(e.target.value)
        console.log("content" + content)
    }
    const handleContentChange = (e) => {
        setContent(e.target.value)
        console.log("content" + content)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        createPost()
    }

    const createPost = () => {
        const accessToken = sessionStorage.getItem('accessToken')
        console.log("accessToken : ", accessToken)

        postAPI.post('/createPost',{
            content : content
        }, {
            headers :{
                Authorization: `Bearer ${accessToken}`
            },
            
        })
        .then((response) =>{
            console.log(response)
        })
        .catch((error) =>{
            console.log("cannot create post : " + error)
        })

    }
    return(
        <>
            <Header/>
                <Container className="align-items-center" style={{ height:'auto',minHeight: '100vh', width:"80%", backgroundColor:'#e6e6e6'}}>
                    <Row>
                        <Col className="" md={3}>
                          
                            <UserProfile/>
                        </Col>

                        <Col style={{marginLeft:"10px", marginRight:"10px", height:'100%'}}  md={6}>
          
                            <StartPost/>
                            <hr/>
                            <Posts/>

                            
                        </Col>

                        <Col className="">

                        </Col>
                </Row>
            </Container>
        </>
    )
}

export default Homepage