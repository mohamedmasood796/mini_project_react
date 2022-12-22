import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alrtSlice";


const Login = () => {
const dispatch=useDispatch()
    const navigate=useNavigate()

    const onFinish=async(values)=>{
        try {
          dispatch(showLoading())
            const response = await axios.post("/api/user/login", values);
            dispatch(hideLoading())
            if (response.data.success) {
              toast.success(response.data.message);
              toast('redirectiong to home page')
              localStorage.setItem("token",response.data.data)
              navigate('/')
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            dispatch(hideLoading())
            toast.error("somethingdsdsds went wrong");
          }
    }
  return (
    <div className="authentication">
      <div className="register-form card p-4">
        <h1 className="card-title">Welcome back😊</h1>
        <Form layout="vertical" onFinish={onFinish}>
        
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password"/>
          </Form.Item>
          <Button className="primary-button my-3" htmlType="submit">Login</Button>
          <Link to='/register' className="anchor">Click here to register</Link>
        </Form>

      </div>
    </div>
  );
};

export default Login;
