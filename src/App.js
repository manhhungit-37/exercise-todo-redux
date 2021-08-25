import React, { useEffect, Suspense } from 'react';
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

// actions
import { setUser } from 'actions/user.action';

// guards
import GuestGuard from 'guards/GuestGuard';
import AuthGuard from 'guards/AuthGuard'; 

//services
import authService from 'services/authService';
import Todos from 'views/Todos/Todos';

// lazy load component
const RegisterComponent = React.lazy(() => import('views/Register/Register'));
const LoginComponent = React.lazy(() => import('views/Login/Login'));
const TodosContainer = React.lazy(() => import('containers/todos/TodosContainer'));

function App() {
  const user = useSelector(state => state.user.user);
  const isSuccess = useSelector(state => state.user.isSuccess);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!window.localStorage.getItem("token")) return;
    const fetchAuth = async () => {
      try {
        const responseAuth = await authService.post('/api/auth', {} ,{
          headers: {
            "x-auth-token": window.localStorage.getItem('token')
          }
        })
        const { user }  = responseAuth.data.user;
        dispatch(setUser(user));
      } catch (err) {
        window.localStorage.removeItem('token');
      }
    }

    fetchAuth();
  }, [dispatch, history, isSuccess])
  
  return (
      <>
        <Suspense fallback={<div>Loading</div>}>
          <Switch>
            <Route exact path="/">
              {user ? <Redirect to="/todos" /> : <Redirect to="/login" />}
            </Route>
            <AuthGuard path="/todos" component={TodosContainer} />
            <GuestGuard exact path="/login" isRestricted component={LoginComponent} />
            <GuestGuard exact path="/register" isRestricted component={RegisterComponent} />
          </Switch>
        </Suspense>
      </>
  )
}
export default App;
