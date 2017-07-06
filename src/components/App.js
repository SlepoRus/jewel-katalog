import React from 'react';
import './App.less';
import Catalog from './Catalog';
import Link from 'react-router-dom/Link';
import Switch from 'react-router-dom/Switch';
import Router from 'react-router-dom/Route';
import Auth from './Auth';
import NavLink from 'react-router-dom/NavLink';
import {Auth as api} from '../api';
import Order from './Order';
const App = (props) => (
  <div>
    <header>
      <h1>Ювелирное производство Туликов</h1>
      <NavLink activeStyle={{color: '#888'}} to='/catalog'>
        <div>КАТАЛОГ</div>
      </NavLink>
          <NavLink to='/order'>
            <div>ЗАКАЗ</div>
          </NavLink>

      <div>ИЗДЕЛИЯ В ЗАКАЗЕ</div>
      <div>ИСТОРИЯ ИЗДЕЛИЙ</div>
      {props.auth.ssid ? (
          <div onClick={()=> {
              api.logout().then(() => {
                location.href='/';
              }).catch((err)=> {
                console.log(err);
              })
            }}>ВЫХОД({props.auth.login})</div>
      ) : (
        <NavLink activeStyle={{color: '#888'}} to='/auth/login' >
          <div>АВТОРИЗАЦИЯ</div>
        </NavLink>
      )}
    </header>
    <main>
      <Rtr {...props}/>
    </main>
  </div>
)
const Menu = () => (
  <div>123</div>
)
const Rtr = (props) => (
  <Switch>
    <Router exact path='/' component={Catalog} />
    <Router exact path='/catalog' component={Catalog} />
        <Router exact path='/order' component={Order} />
    <Router path='/auth' component={Auth} />
  </Switch>
)
export default App;
