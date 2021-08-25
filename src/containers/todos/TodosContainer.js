import React, {Suspense} from 'react';
import { Switch } from 'react-router-dom';

//auth
import  AuthGuard from 'guards/AuthGuard';

//lazy load
const TodosComponent = React.lazy(() => import('views/Todos/Todos'));
const TodoDetailComponent = React.lazy(() => import('views/Todos/TodoDetail'));


function TodosContainer() {
  return (
    <div>
      <Suspense  fallback={<div>Loading</div>}>
        <Switch>
          <AuthGuard path="/todos/:todoId" component={TodoDetailComponent} />
          <AuthGuard path="/todos" component={TodosComponent} />
        </Switch>
      </Suspense>
    </div>
  )
}

export default TodosContainer
