import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

//antd
import { Form, Input, Button, Select } from 'antd';

//action
import { addTodo } from 'actions/todos.action';

function TodoForm() {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (newTodo) => {
    dispatch(addTodo({
      id: Date.now(),
      key: Date.now(),
      author: `${user.firstName} ${user.lastName}`,
      ...newTodo
    }))
    form.resetFields();
  }

  return (
    <Form
      name="basic"
      className="login-form"
      form={form}
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        severity: "low",
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input your title!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input your description!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Severity" name="severity">
          <Select>
          <Select.Option value="low">Low</Select.Option>
          <Select.Option value="medium">Medium</Select.Option>
          <Select.Option value="high">High</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 23,
          span: 1,
        }}
      >
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
     
    </Form>
  )
}

export default TodoForm
