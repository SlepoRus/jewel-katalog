import axios from 'axios';
module.exports.Jewelry = {
  read(data) {
    var url = '';
    var { id, offset } = data;
    if (!id) id = '';

    if (offset) {
        url = `?offset=${offset}`;
    }

    return axios.get(`/jewelry/${id}${url}`)
  },
  create(data) {
    return axios.post(`/jewelry/`, data);
  },
  update(data) {
    return axios.put(`/jewelry/${data.id}`, data)
  },
  delete(data) {
    return axios.delete(`/jewelry/${data.id}`);
  },
}
module.exports.Auth = {
  register(data) {
    return axios.post(`/auth/register`, data);
  },
  auth(data) {
    return axios.post(`/auth/login`, data);
  },
  logout(data) {
    return axios.post(`/auth/logout`);
  }
}
