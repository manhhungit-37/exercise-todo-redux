import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

//services
import todosService from 'services/todosService';

function TodoDetail() {
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await todosService.get(`/api/todos/${params.todoId}`);
      setData(res.data.data);
    }
    if (!params.todoId) return;
    fetchTodo();
  }, [params.todoId])

  return (
    <div className="detail">
      {Object.keys(data).length > 0 ? (
        <>
          <h1>Title: {data.title}</h1>
          <div>Author: {data.author}</div>
          <div>Severity: {data.severity}</div>
          <div>Status: {data.status}</div>
        </>
      ) : <div>No data</div>
    }
    </div>
  )
}

export default TodoDetail
