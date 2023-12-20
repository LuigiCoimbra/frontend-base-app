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
    register(credential) {
      return Api.post('/users', credential)
    },
    addBot(bot_info) {
      return Api.post('/items/bots', bot_info, {'Authorization': `Bearer ${localStorage.getItem('token')}`});
    },
    editBot(bot_info) {
      return Api.patch(`/items/bots/${bot_info.id}`, bot_info, {'Authorization': `Bearer ${localStorage.getItem('token')}`});
    },
    listBot() {
      return Api.get('/items/bots/?fields=*,bot_type.type_name', {'Authorization': `Bearer ${localStorage.getItem('token')}`});
    },
    deleteBot(id) {
      return Api.delete(`/items/bots/${id}`, {'Authorization': `Bearer ${localStorage.getItem('token')}`});
    },
    typeBot() {
      return Api.get('/items/bot_types', {'Authorization': `Bearer ${localStorage.getItem('token')}`})
    }
}