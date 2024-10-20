import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://admin.interazap.com.br/',
});
Api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  if(error.response.status == 401) {
    console.log(error.response.status)
    const refresh_user = {
      refresh_token: localStorage.getItem('refresh_token'),
      mode: 'json'
    }
    Api.post('/auth/refresh', refresh_user)
    .then(res => {
      console.log(res)
    })
    .catch((err) => {
      console.log("err--", err)
      // if (err.response.status == 401) {
      //   window.location.href = '/login'
      // }
    }) 
  }
  // if(error.response.status == 403) {
  //   console.log(error.response.status)
  //   Api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  //   return window.location.reload();
  // }
  return Promise.reject(error);
});

export default Api