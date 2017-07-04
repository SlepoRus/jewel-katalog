import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux/lib/components/Provider';
import App from './components/App';
import configureStore from './redux/configureStore';
import Catalog from './components/Catalog';
import BrowserRouter from 'react-router-dom/BrowserRouter';
var store = configureStore();

const component = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(component, document.getElementById('react-view'));
