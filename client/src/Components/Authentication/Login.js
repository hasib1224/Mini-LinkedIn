import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const signupValues = {
    username: '',
    email: '',
    signUpPass: ''
}

const loginValues = {
    email: '',
    signInPass: ''
}
const Login = () => {

    const navigate = useNavigate()
    const [login, setLogin] = useState(1)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [signInPass, setSignInPass] = useState('');
    const [newUserInfo, setNewUserInfo] = useState(signupValues)
    const [loginInfo, setLoginInfo] = useState(loginValues)

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const onInputChange = (e) => {
        console.log("name : ", e.target.name)
        setNewUserInfo({ ...newUserInfo, [e.target.name]: e.target.value })
        console.log("Userinfo : ", newUserInfo)
    }

    const onValueChange = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
        console.log("Login Info : ", loginInfo)
    }

    const offLogin = () => {
        setLogin(0)
    }

    const onLogin = () => {
        setLogin(1)
    }

    const signIn = () => {
        console.log("loginInfo : ", loginInfo)

        axios.post("http://localhost:5000/login", {
            // username : username,
            // password : signInPass
            loginInfo: loginInfo

        }).then((response) => {
            if (response) {
                console.log("access token : ", response.data.accessToken)
                sessionStorage.setItem('accessToken', response.data.accessToken)
                //history('/Homepage')
                navigate('/Homepage')
            }

        }).catch((err) => {
            if (err) {
                console.log(err)
            }
        })
    }

    const signUp = () => {
        console.log(newUserInfo)
        // axios.post('http://localhost:5000/users/add',{
        //     userInfo : newUserInfo
        // })
        axios.post('http://localhost:5000/signup', {
            userInfo: newUserInfo
        })
            .then((response) => {
                console.log(response)
                setLogin(1)
                setNewUserInfo(signupValues)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    return (
        <>
            <div style={{ backgroundColor: 'white' }}>

                {login &&
                    <Form
                        name="normal_login"
                        className="login-form w-25 mx-auto"
                        initialValues={{ remember: true }}
                        style={{
                            border: "1px solid", borderColor: "lightgrey", marginTop: "100px",
                            borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                        }}
                    >
                        <img src="https://www.edigitalagency.com.au/wp-content/uploads/Linkedin-logo-png.png"
                            style={{
                                hegiht: "40px",
                                width: "120px",
                                marginTop: "50px"
                            }}>

                        </img>
                        <h2 style={{ 
                            textAlign: "center",
                            marginTop: "10px",
                            fontFamily:'sans-serif',
                            fontWeight: "bold",
                        }}>Sign In</h2>
                        <Form.Item
                            name="email"
                            onChange={(e) => onValueChange(e)}
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                            style={{ marginTop: "50px" }}
                        // label = "Email"
                        // labelCol={{ span: 24 }} // Make the label take the full width of the form item
                        // // style={{marginLeft:"20px"}}
                        // // wrapperCol={{ span: 16 }}

                        >
                            <Input
                                name="email"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                type="text"
                                placeholder="Email"
                                value={email}
                                style={{ width: "80%", height: "50px", border: "1px solid" }}
                            //onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="signInPass"
                            onChange={(e) => onValueChange(e)}
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                            style={{ marginTop: "50px" }}


                        >
                            <Input
                                name="signInPass"
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                value={signInPass}
                                style={{ width: "80%", height: "50px", border: "1px solid" }}
                                onChange={(ev) => setSignInPass(ev.target.value)}
                            />
                        </Form.Item>
                        {/* <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item> */}

                        <Form.Item>
                            <Button onClick={() => signIn()} type="primary" htmlType="submit" className="login-form-button"
                                style={{ width: "80%", height: "40px", marginTop: "20px", boder: "1px", borderRadius: "20px" }}>
                                Log in
                            </Button>
                            <br />
                            Or
                            <br />
                            New to LinkedIn?
                            <Button type='Link' onClick={() => offLogin()} htmlType="submit" className="login-form-button text-primary" style={{ textDecoration: 'underline', }}>
                                Join Now
                            </Button>
                        </Form.Item>
                    </Form>
                }

                {(!login) &&
                    <Form
                        name="normal_login"
                        className="login-form w-25 m-auto mt-5"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        style={{ border: '1px solid', borderColor: "lightgrey", display: 'flex', flexDirection: 'column', alignItems: 'center',
                        borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'

                        }}>
                        <div style={{ width: "80%" }}>
                            {/* <h1>LinkedIn</h1> */}
                            <h2 style={{ textAlign: 'left', marginTop: '20px' }}>Join Linkedin</h2>
                            <Form.Item
                                name="username"
                                onChange={(e) => onInputChange(e)}
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input
                                    style={{ marginLeft: 0, width: "100%", height: "50px", border: "1px solid" }}
                                    name="username"
                                    prefix={<UserOutlined
                                        className="site-form-item-icon" />}
                                    placeholder="Username" />

                            </Form.Item>

                            <Form.Item
                                name="email"
                                onChange={(e) => onInputChange(e)}
                                rules={[{ required: true, message: 'Please input your Email!' }]}
                            >
                                <Input
                                    name="email"
                                    style={{ marginLeft: 0, width: "100%", height: "50px", border: "1px solid" }}
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="signUpPass"
                                onChange={(e) => onInputChange(e)}
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    style={{ marginLeft: 0, width: "100%", height: "50px", border: "1px solid" }}
                                    name="signUpPass"
                                    type="password"
                                    placeholder="Password(At least 6 characters)"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type='primary' onClick={() => signUp()} htmlType="submit" className="login-form-button"
                                    style={{
                                        width: "100%", height: "60px",
                                        marginTop: "20px",
                                        border: "1px", borderRadius: "50px",
                                        fontSize: "16px",
                                        fontWeight: 'bold'
                                    }}>
                                    Agree and join
                                </Button>
                                <br />
                                Or
                                <br />

                                Already on Linkedin?
                                <Button type='Link' onClick={() => onLogin()} htmlType="submit" className="login-form-button text-primary">
                                    Sign in
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                }
            </div>
        </>
    );
}

export default Login

