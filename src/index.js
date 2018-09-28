import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';

import { AppContainer } from 'react-hot-loader';


const render = () => {
ReactDOM.render(
<AppContainer>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
    </AppContainer>,
     document.getElementById('root')
    );
}


render();


if (module.hot) {
    module.hot.accept('./App', () => {
      render();
    });
  }