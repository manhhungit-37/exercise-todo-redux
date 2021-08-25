import App from 'App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store/store';
import { BrowserRouter as Router} from 'react-router-dom';

// styles
import 'antd/dist/antd.css';
import 'index.css';

import initRequest from 'services/initRequest';

initRequest(store)

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

