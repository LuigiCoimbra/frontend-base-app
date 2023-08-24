import Api from "./Api";

export default{
    login(credential) {
      return Api.post('/auth/login', credential)
      .then(response => {
        console.log(response)
        const token = response.data.data.access_token;
        localStorage.setItem("token", token)
        Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return response
      }).catch((err) => {
        console.log(err)
        localStorage.removeItem("token")
      });
    },
    addBot(bot_info) {
      return Api.post('/items/bot_list', bot_info, {'Authorization': `Bearer ${localStorage.getItem('token')}`});
    },
    editBot(bot_info) {
      return Api.patch(`/items/bot_list/${bot_info.id}`, bot_info, {'Authorization': `Bearer ${localStorage.getItem('token')}`});
    },
    listBot() {
      return Api.get('/items/bot_list', {'Authorization': `Bearer ${localStorage.getItem('token')}`});
    },
    deleteBot(id) {
      return Api.delete(`/items/bot_list/${id}`, {'Authorization': `Bearer ${localStorage.getItem('token')}`});
    }
}