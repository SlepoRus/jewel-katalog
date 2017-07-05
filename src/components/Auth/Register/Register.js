import React from 'react';
import {Auth as api} from '../../../api';
import Login from '../Login';
export default class Register extends Login {
  constructor(props) {
    super(props);
    this.state.repeatpassword = '';
    this.onChangePasswordRepeat = this.onChangePasswordRepeat.bind(this);
  }
  onChangePasswordRepeat(e) {
    const { value } = e.target;
    this.setState({ repeatpassword:value });
  }
  handleSubmit(e) {
      const data = {};
      e.preventDefault();
      const { login, password, repeatpassword } = this.state;
      if (!login || !password || !repeatpassword) {
        this.setState({ error: 'Все поля должны быть заполнены'})
      } else
      if (login.length < 3) {
        this.setState({ error: 'Логин должен быть больше 3 букв!'})
      } else
      if (password !== repeatpassword) {
        this.setState({ error: 'Пароль не совпадают'})
      } else {
        data.login = login;
        data.password = password;
        this.setState({ loading: true,error:'' });
        api.register(data).then((val) => {
          console.log(val);
          this.setState({ loading: false });
          location.href='/';
        }).catch((err) => {
          console.log(err);
          this.setState({ loading: false });
          this.setState({ error: 'Такая учетная запись уже существует'})
        })
      }
      return false;
  }
  _options() {
    const { login, password, repeatpassword } = this.state;
    return [{
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
    {
      name: 'repeatpassword',
      value: repeatpassword,
      placeholder: 'Повторите пароль',
      type: 'password',
      label: 'Повторите Пароль',
      onChange: this.onChangePasswordRepeat
    }]
  }
}
