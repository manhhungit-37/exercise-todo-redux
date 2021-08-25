import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoForm from './TodoForm';
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog';

//react-router
import { Link, useHistory } from 'react-router-dom';

//services
import todosService from 'services/todosService';

//antd
import { Button, Table } from 'antd';

// actions
import { logout } from 'actions/user.action';
import { getTodos, setComplete, deleteTodo, setTodos } from 'actions/todos.action';

function Todos() {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todoItem, setTodoItem] = useState({})

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch])

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key:" title",
      render: (text, record) => <Link to={`/todos/${record.id}`} className={record.status === "completed" ? "line-through" : ""}>{text}</Link>
    },
    {
      title: "",
      dataIndex: "",
      key: "action",
      render: (_, record) => (
        <div className="action">
          <Button className={"blue"} disabled={record.status === "completed" ? true : false} onClick={() => dispatch(setComplete(record.id))}>{record.status === "completed" ? "Completed" : "Complete"}</Button>
          <Button className="red" onClick={handleRequestDelete(record.id)}>Delete</Button>
        </div>
      )
    }
  ]

  function sortByType(type) {
    if (type === "ASC") {
      todos.sort((a, b) => {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      })
    }
    if (type === "DESC") {
      todos.sort((a, b) => {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
        return 0;
      })
    }
    dispatch(setTodos([...todos]));
  }

  function handleLogout() {
    dispatch(logout())
    history.push('/login');
  }

  function handleOk() {
    dispatch(deleteTodo(todoItem.id));
    setIsModalVisible(false);
  }

  const handleRequestDelete = id => async () => {
    const res = await todosService.get(`/api/todos/${id}`);
    const newTodo = res.data.data;
    setTodoItem(newTodo);
    setIsModalVisible(true)
  }

  function handleCancel() {
    setIsModalVisible(false)
  }

  return (
      <>
        <Button type="primary" onClick={handleLogout}>Logout</Button>
        <TodoForm />
        <Button type="primary" className="button-todo" onClick={() => sortByType("ASC")}>ASC</Button>
        <Button type="primary" className="button-todo" onClick={() => sortByType("DESC")}>DESC</Button>
        <Table dataSource={todos} columns={columns} />     

        <ConfirmDialog 
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
        >
          Title: {todoItem?.title}
          <br />
          Author: {todoItem?.author}
        </ConfirmDialog>
      </>
  )
}

export default Todos
