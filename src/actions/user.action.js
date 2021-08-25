// services
import authService from 'services/authService';

export const SET_USER = "USER/SET_USER";
export const SET_SUCCESS = "USER/SET_SUCCESS";
export const LOGOUT = "USER/LOGOUT";

export const loginUser = (params, history) => async dispatch => {
  try {
    const res = await authService.post('/api/user/login', params, {
      showSpinner: true
    })
    const { token, isSucess } = res.data;
    dispatch({ type: SET_SUCCESS, payload: isSucess });
    window.localStorage.setItem('token', token);
    history.push('/')
  } catch (err) {
    console.log('loginUser err: ', err.response)
  }
}

export const registerUser = (params, history) => async () => {
  try {
    await authService.post('/api/user/register', params, {
      headers: {
        'Content-Type': 'application/json',
      },
      showSpinner: true
    })
    history.push('/login');
  } catch (error) {
    console.log(error.response);
  }
}

export const setUser = payload => ({
  type: SET_USER,
  payload
})

export const logout = () => dispatch => {
  window.localStorage.removeItem('token');
  dispatch({ type: LOGOUT })
}