import React from 'react'
import { Link, useHistory, } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//antd
import { Form, Input, Button } from 'antd';

//actions
import { registerUser } from 'actions/user.action';

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = account => {
    account.avatar = "https://bitly.com.vn/cax03l";
    account.role = "operator";
    dispatch(registerUser(account, history));
  };

  return (
    <div className="register">
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <Form
      name="basic"
      className="login-form"
      labelCol={{
        span: 9,
      }}
      wrapperCol={{
        span: 6,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="FirstName"
        name="firstName"
        rules={[
          {
            required: true,
            message: 'Please input your first name!',
          },
          {
            min: 2,
            message: "Please input length of first name > 2"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="LastName"
        name="lastName"
        rules={[
          {
            required: true,
            message: 'Please input your last name!',
          },
          {
            min: 2,
            message: "Please input length of last name > 2"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
          {
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Please input email type"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 9,
          span: 15,
        }}
      >
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
        <Link to="/login" className="ml-5" >Login</Link>
      </Form.Item>
    </Form>
    </div>
  )
}

export default Register
