import React from 'react';
import './App.less';
import Catalog from './Catalog';
import Link from 'react-router-dom/Link';
import Switch from 'react-router-dom/Switch';
import Router from 'react-router-dom/Route';

const App = (props) => (
  <div>
    <header>
      <h1>Ювелирное производство Туликов</h1>
      <Link to='/'>
        <div>КАТАЛОГ</div>
      </Link>
      <div>ИЗДЕЛИЯ В ЗАКАЗЕ</div>
      <div>ИСТОРИЯ ИЗДЕЛИЙ</div>
      <div>АВТОРИЗАЦИЯ</div>
    </header>
    <main>
      <Rtr />
    </main>
  </div>
)
const Menu = () => (
  <div>123</div>
)
const Rtr = () => (
  <Switch>
    <Router exact path='/' component={Catalog} />
  </Switch>
)
export default App;
