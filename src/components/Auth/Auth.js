import React from 'react';
import './Auth.less';
import Switch from 'react-router-dom/Switch';
import Router from 'react-router-dom/Route';
import NavLink from 'react-router-dom/NavLink';
import Login from './Login';
import Register from './Register'
export default class Auth extends React.Component {
  render() {
    return (
      <div className={'login-main'}>
      <h3>Авторизация</h3>
        <div className={'login-change'}>
          <NavLink to='/auth/login' activeClassName='active'>
            <span>ВХОД</span>
          </NavLink>
          {'         '}
          <NavLink to='/auth/register'>
            <span>РЕГИСТРАЦИЯ</span>
          </NavLink>
        </div>
        <div>
          <Router exact path='/auth/login' component={Login} />
          <Router exact path='/auth/register' component={Register} />
        </div>
      </div>
    )
  }
}
