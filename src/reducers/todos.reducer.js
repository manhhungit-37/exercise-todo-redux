import {ADD_TODO, DELETE_TODO, FETCH_TODOS_FAILURE, FETCH_TODOS_REQUEST, SET_TODOS } from "actions/todos.action";

const initialState = {
  todos: [],
  isLoading: false,
  isError: false
}

const reducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, payload]
      }
    }

    case DELETE_TODO: {
      const newTodos = state.todos.filter(todo => todo.id !== payload.id)
      return {
        ...state,
        todos: newTodos,
      }
    }

    case FETCH_TODOS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }

    case SET_TODOS: {
      return {
        ...state,
        isLoading: false,
        todos: payload,
      }
    } 
    
    case FETCH_TODOS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }   

    default: {
      return state;
    }
  }
}

export default reducer;