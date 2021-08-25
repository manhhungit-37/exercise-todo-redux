import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//antd
import { Form, Input, Button } from 'antd';

// actions
import { loginUser } from 'actions/user.action';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const onFinish = async (account) => {
    dispatch(loginUser(account, history));
  };

  return (
    <div className="login">
      <h2 style={{ textAlign: 'center' }}>Login</h2>
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
          label="Email Address"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
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
            Login
          </Button>
          <Link to="/register" className="ml-5" >Sign Up</Link>
        </Form.Item>
      
      </Form>
    </div>
  );
};

export default Login;