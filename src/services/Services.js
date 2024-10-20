import Api from "./Api";
// import store from "@/store/auth"


export default{
    login(credential) {
      delete Api.defaults.headers.common["Authorization"];
      return Api.post('/auth/login', credential)
      .then(response => {
        // const token = response.data.data.access_token;
        // console.log(token)
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
      return Api.post('/users/register', credential)
    },
    addCliente(cliente_info) {
      return Api.post('/items/Clientes', cliente_info);
    },
    editClientes(cliente_info) {
      return Api.patch(`/items/Clientes/${cliente_info.id}`, cliente_info);
    },
    listClientes() {
      // Api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      return Api.get('/items/Clientes');
    },
    deleteClientes(id) {
      return Api.delete(`/items/Clientes/${id}`);
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
      return Api.get('/items/Empresas')
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