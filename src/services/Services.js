import Api from "./Api";
// import store from "@/store/auth"


export default{
    login(credential) {
      delete Api.defaults.headers.common["Authorization"];
      return Api.post('/auth/login', credential)
      .then(response => {
        const token = response.data.data.access_token;
        console.log(token)
        Api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        // localStorage.setItem("token", token)
        return response
      }).catch((err) => {
        console.log(err)
        localStorage.removeItem("token")
      });
    },
    getUser() {
      return Api.get('/users/me')
    },
    register(credential) {
      return Api.post('/users', credential)
    },
    addBot(bot_info) {
      return Api.post('/items/bots', bot_info);
    },
    editBot(bot_info) {
      return Api.patch(`/items/bots/${bot_info.id}`, bot_info);
    },
    listBot() {
      // Api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      return Api.get('/items/bots/?fields=*,bot_type.type_name');
    },
    deleteBot(id) {
      return Api.delete(`/items/bots/${id}`);
    },
    addContact(contacts_info) {
      return Api.post('/items/contacts', contacts_info);
    },
    addContacts(contacts_info) {
      return Api.post('/items/contacts', contacts_info);
    },
    editContact(contacts_info) {
      return Api.patch(`/items/contacts/${contacts_info.id}`, contacts_info);
    },
    listContact(page) {
      // Api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      return Api.get(`/items/contacts?fields=*,etiqueta.tag_name&page=${page}&limit=50&meta=*`);
    },
    searchContact(celphone) {
      // Api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      return Api.get(`/items/contacts?search=${celphone}&meta=*`);
    },
    deleteContact(id) {
      return Api.delete(`/items/contacts/${id}`);
    },
    typeBot() {
      return Api.get('/items/bot_types')
    },
    listTags() {
      return Api.get('/items/etiqueta')
    },
    addTags(tags_info) {
      return Api.post('/items/etiqueta', tags_info)
    },
    editTags() {
      return Api.get('/items/etiqueta')
    },
    deleteTags() {
      return Api.get('/items/etiqueta')
    },
    logout() {
      const refresh_user = {
        refresh_token: localStorage.getItem('refresh_token')
      }
      return Api.post('/auth/logout', refresh_user)
    }
}