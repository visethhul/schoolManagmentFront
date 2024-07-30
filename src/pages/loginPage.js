import React, { useState } from "react";
import { Form, Input, Button, message} from 'antd';
import styles from './cssPage/LoginPage.module.css'
import { ApiRequest } from "../utils/apiRequest";
import { setUser, setToken, setRefreshToken, setIsLogin } from "../utils/userAuth";
//import { useNavigate } from 'react-router-dom'
 const LoginPage=()=> {
  const [loading, setLoading] = useState(false);
  //const navigate = useNavigate()

  const onFinish = async(values)=> {
    console.log("Received values of form",values)
    setLoading(true);
    var param={
      user_name:values.username,
      password:values.password,
    }
    try {
      const data = await ApiRequest('login','POST',param)
      message.success(data.message)
      console.log('user',data.user)
      console.log('refreshToken',data.refreshToken)
      console.log('token',data.token)
      // Save user and token inforamton
      setUser(data.user)
      setToken(data.token)
      setRefreshToken(data.refreshToken)
      setIsLogin(true)
      // show deshoard
      //navigate('/dashboard')
      window.location.href="/dashboard"
    }catch(error){
      message.error(error.message || 'Login faild, please check your credentials')
      console.log(error.message)
    }
    setLoading(false)
  }

  return (
    <div className={styles.container}>
     <Form 
      name="login"
      initialValues={{ remember:true }}
      onFinish={onFinish}
      className={styles.form}
      >
      <h1>Login </h1>
      <h3 style={{color:"red"}}>Message:{loading ? "Loading...":""}</h3>
      <Form.Item
        name="username"
        rules={[{ required:true, message:'PLease input your username'}]}
      >
        <Input placeholder="Username"/>
      </Form.Item>
      <Form.Item
       name ="password"
       rules={[{ required:true, message:'Please input your password'}]}
      >
        <Input.Password placeholder="Password"/>
      </Form.Item>

      <Form.Item>
        <Button type="primary"
        htmlType="submit"
        loading={loading}
        className={styles.button}>Login
        </Button>
      </Form.Item>
     </Form> 
    </div>
  )
};
export default LoginPage;
