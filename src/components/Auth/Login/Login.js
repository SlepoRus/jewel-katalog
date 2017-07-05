import React from 'react';
import { Input } from '../../lib';
import {Auth as api} from '../../../api';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      error: '',
      loading: false,
    }
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChangeLogin(e) {
    const { value } = e.target;
    this.setState({ login:value })
  }
  onChangePassword(e) {
    const { value } = e.target;
    this.setState({ password:value })
  }
  handleSubmit(e) {
    const data = {};
    const { login, password } = this.state;
    data.login = login;
    data.password = password;
    this.setState({ loading: true,error:'' });
    api.auth(data).then((val) => {
      console.log(val);
      this.setState({ loading: false });
      location.href='/';
    }).catch((err) => {
      console.log(err);
      this.setState({ loading: false });
      this.setState({ error: 'Неправильный логин или пароль'})
    })
    return false;
  }
  _options() {
    const { login, password } = this.state;
    return [
      {
        name: 'login',
        value: login,
        placeholder: 'Учетная запись',
        type: 'text',
        label: 'Учетная запись',
        onChange: this.onChangeLogin
      },
      {
        name: 'password',
        value: password,
        placeholder: 'Пароль',
        type: 'password',
        label: 'Пароль',
        onChange: this.onChangePassword
      },
    ]
  }
  render() {
    const { error, loading } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {this._options().map((val,key) => {
          return <Input {...val} key={key}/>
        })}
        <button
          className={error ? 'jewel-button warning' : 'jewel-button success'}
          onClick={this.handleSubmit}
          type="submit"
          disabled={loading}>
          {loading ? (<img src="../../../public/stuff/pageloader.gif" width="30px"/>) : (error || 'Вход')}</button>
      </form>
    )
  }
}
