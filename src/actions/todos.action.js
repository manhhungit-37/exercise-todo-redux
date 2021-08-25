import todosService from "services/todosService";

//export action name
export const ADD_TODO = "TODOS/ADD";
export const DELETE_TODO = "TODOS/DELETE";
export const FETCH_TODOS_REQUEST = "TODOS/FETCH_REQUEST";
export const FETCH_TODOS_FAILURE = "TODOS/FETCH_FAILURE";
export const SET_TODOS = "TODOS/SET_TODOS";

export const setTodos = (payload) => ({
  type: SET_TODOS,
  payload
})

export const addTodo = (todo) => async dispatch => {
  try {
    const res = await todosService.post("/api/todos", todo);
    const { data } = res.data;
    dispatch({
      type: ADD_TODO,
      payload: data
    })
  } catch (error) {
    console.log(error);
  }
}

export const deleteTodo = (id) => async dispatch => {
  try {
    await todosService.delete(`/api/todos/${id}`);
    dispatch({
      type: DELETE_TODO,
      payload: {
        id
      }
    })
  } catch (error) {
    console.log("Can not delete todo");
  }
}

export const getTodos = () => async dispatch => {
  dispatch({ type: FETCH_TODOS_REQUEST });
  try {
    const res = await todosService.get('/api/todos', {
      showSpinner: true
    })
    const { data } = res.data;
    data.map(item => item.key = item.id);
    dispatch(setTodos(data));
  } catch (error) {
    dispatch({ type: FETCH_TODOS_FAILURE, payload: error });
  }
}

export const setComplete = (id) => async dispatch => {
  try {
    await todosService.patch(`/api/todos/${id}`, {
      status: "completed"
    });
    dispatch(getTodos())
  } catch (err) {
    console.log(err);
  }
}


