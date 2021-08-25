import { SET_USER, LOGOUT, SET_SUCCESS } from 'actions/user.action';

const initialValue = {
  user: null,
  isSuccess: false
}

const reducer = (state = initialValue, { type, payload }) => {
  switch(type) {
    case SET_USER: {
      return {
        ...state,
        user: payload
      }
    }

    case SET_SUCCESS: {
      return {
        ...state,
        isSuccess: payload
      }
    }

    case LOGOUT: {
      return initialValue
    }

    default: {
      return state;
    }
  }
}

export default reducer;