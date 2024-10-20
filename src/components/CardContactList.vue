
<template>
    <v-container class="d-flex align-center flex-column">
        <v-card width="85%">
            <v-card-actions>
              <v-btn density="comfortable" icon="mdi-import" @click="dialog = true;"></v-btn>
            </v-card-actions>
            <v-card-title>Lista de Bots</v-card-title>
            <v-card-subtitle>Crie, edite e gerencie seus bots</v-card-subtitle>
						<v-card-text>
              <v-text-field
                v-model="search"
                density="compact"
                variant="solo"
                label="Buscar contato"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                @click:append-inner="searchContact"
              ></v-text-field>
              <v-table>
                  <thead>
                      <tr>
                          <th class="text-left">Nome</th>
                          <th class="text-left">Celular</th>
                          <th class="text-left">Etiquetas</th>
                          <th class="text-left">Ações</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr
                          v-for="item in contacts"
                          :key="item.contact_name"
                      >
                          <td>{{ item.contact_name }}</td>
                          <td>{{ item.contact_telphone }}</td>
                          <td>{{ item.etiqueta }}</td>
                          <td>
                            <v-btn class="mr-1" density="compact" icon="mdi-square-edit-outline" @click="dialog = true; contact_name = item.contact_name; etiqueta = item.etiqueta; id = item.id"></v-btn>
                            <v-btn density="compact" icon="mdi-delete-outline" @click="dialogDelete = true; id = item.id"></v-btn>
                          </td>
                      </tr>
											<v-pagination v-model="page" :length="Math.ceil(totalItems / showing)" @update:model-value="listContact"></v-pagination>
                  </tbody>
              </v-table>
						</v-card-text>
            <v-dialog
              v-model="dialog">
              <v-card>
                <v-card-title>Importar Contatos</v-card-title>
                <v-card-text>
                  <v-autocomplete v-model="tag" :items="tags_list" item-title="name_tag" item-value="id" return-object label="Etiqueta" color="#940CC4" outlined hide-details prepend-inner-icon="mdi-robot-outline" class="mb-5 pl-2" style="background: #FFF; border-radius: 50px;"></v-autocomplete>
                  <input type="file" @change="onChange" />
                </v-card-text>
                <v-card-actions v-if="this.id === ''">
                  <v-btn
                  variant="outlined"
                  color="#8934eb"
                  width="65%"
                  v-on:click="addContact"
                  >
                    <span>Criar</span>
                  </v-btn>
                </v-card-actions>
                <v-card-actions v-else>
                  <v-btn
                  variant="outlined"
                  color="#8934eb"
                  width="65%"
                  v-on:click="editClientes"
                  >
                    <span>Editar</span>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
            v-model="dialogDelete">
              <v-card>
                <v-card-title>Confirmar ação</v-card-title>
                <v-card-actions style="display: flex; justify-content: center; align-items: center;">
                  <v-btn
                  variant="flat"
                  color="red"
                  v-on:click="deleteClientes">Deletar</v-btn>
                  <v-btn
                  variant="outlined"
                  color="#8934eb"
                  v-on:click="dialogDelete = false">Cancelar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </v-card>
    </v-container>
    </template>
    <script>
// eslint-disable vue/no-arrow-functions-in-watch
    import services from '@/services/Services';
    import readXlsxFile from 'read-excel-file'
    export default {
      name: 'CardBotList',
      data () {
        return {
          id: '',
					search: '',
					page: 1,
          showing: 50,
          totalItems: 0,
          name_contact: '',
          type_bot: '',
					loading: false,
          dialog: false,
          dialogDelete: false,
          model: false,
          contact_list: [],
          tag: '',
          contacts: [],
          tags_list: []
        }
      },
      methods: {
        async addContact() {
            console.log(this.contact_list)
          const res = await services.addContact(this.contact_list)
          if (res.status === 200) {
            alert('Bot criado com Sucesso');
            this.listContact()
            this.dialog = false
          } else {
            alert('Informações incorretas');
          }
        },
        async searchContact() {
          const res = await services.searchContact(this.search)
          if (res.data.data) {
            this.contacts = res.data.data.map((item) => ({
							contact_name: item.contact_name,
							contact_telphone: item.contact_telphone,
              etiqueta: item.etiqueta,
            }));
            this.totalItems = res.data.meta.total_count
          } else {
            alert('Erro ao carregar dados');
          }
        },
        async editContact() {
          const res = await services.editContact({
            id: this.id,
            bot_name: this.name_bot,
            bot_type: this.type_bot
          })
          if (res.status === 200) {
            alert('Bot alterado com Sucesso');
            this.listContact()
            this.dialog = false
            this.id = ''
            this.name_bot = ''
            this.type_bot = ''
          } else {
            alert('Informações incorretas');
          }
        },
        async listContact() {
          const res = await services.listContact(this.page)
					console.log(res)
          if (res.data.data) {
            this.contacts = res.data.data.map((item) => ({
							contact_name: item.contact_name,
							contact_telphone: item.contact_telphone,
              etiqueta: item.etiqueta.tag_name,
            }));
            this.totalItems = res.data.meta.total_count
            console.log(this.contacts)
          } else {
            alert('Erro ao carregar dados');
          }
        },
        async deleteContact() {
          const res = await services.deleteClientes(this.id)
          if (res.status === 204) {
            alert('Bot deletado com Sucesso');
            this.listClientes()
            this.dialogDelete = false
          } else {
            alert('Informações incorretas');
          }
        },
        async typeBot() {
          const res = await services.typeBot()
          if (res.data.data) {
            this.bot_types = res.data.data.map((item) => ({
              type_id: item.id,
              type_name: item.type_name,
            }));
            console.log(this.bot_types)
          } else {
            alert('Erro ao carregar dados');
          }
        },
        onChange(event) {
            let xlsxfile = event.target.files ? event.target.files[0] : null;
            readXlsxFile(xlsxfile).then((rows) => {
                this.contact_list = rows.map((item) => ({
                    contact_name: item[0],
                    contact_telphone: item[1],
                    etiqueta: this.tag
                }))
                console.log(this.contact_list)
            })
        },
        async listTags() {
          const res = await services.listTags()
          if (res.data.data) {
            this.tags_list = res.data.data.map((item) => ({
              id: item.id,
              name_tag: item.tag_name,
              status: item.status,
            }));
            console.log(this.tags_list)
          } else {
            alert('Erro ao carregar dados');
          }
        },
        async next () {
          const res = await services.listContact(this.page)
					console.log(res)
          if (res.data.data) {
            this.contacts = res.data.data.map((item) => ({
							contact_name: item.contact_name,
							contact_celular: item.contact_celular,
              etiqueta: item.etiqueta,
            }));
          } else {
            alert('Erro ao carregar dados');
          }
        }
        // formatDate(date) {
        //   let year = date.slice(0,4)
        //   let month = date.slice(5,7)
        //   let day = date.slice(8,10)
        //   let time = date.slice(11,16)
        //   const dateFormated = day + '/' + month + '/' + year + ' ' + time
        //   return dateFormated
        // },
      },
      mounted () {
        this.listContact()
        // this.typeBot()
        this.listTags()
      },
    }
    </script>