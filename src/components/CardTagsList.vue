<template>
    <v-container class="d-flex align-center flex-column">
        <v-card width="85%">
            <v-card-actions>
              <v-btn density="comfortable" icon="mdi-plus" @click="dialog = true;"></v-btn>
            </v-card-actions>
            <v-card-title>Lista de Bots</v-card-title>
            <v-card-subtitle>Crie, edite e gerencie seus bots</v-card-subtitle>
            <v-card-text>
              <v-table>
                  <thead>
                      <tr>
                          <th class="text-left">Id</th>
                          <th class="text-left">Etiqueta</th>
                          <th class="text-left">Status</th>
                          <th class="text-left">Ações</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr
                          v-for="item in tags_list"
                          :key="item.id"
                      >
                          <td>{{ item.id }}</td>
                          <td>{{ item.name_tag }}</td>
                          <td>{{ item.status }}</td>
                          <td>
                            <v-btn class="mr-1" density="compact" icon="mdi-square-edit-outline" @click="dialog = true; name_tag = item.name_tag; id = item.id"></v-btn>
                            <v-btn density="compact" icon="mdi-delete-outline" @click="dialogDelete = true; id = item.id"></v-btn>
                          </td>
                      </tr>
                  </tbody>
              </v-table>
            </v-card-text>
            <v-dialog
              v-model="dialog">
              <v-card>
                <v-card-title>Criar nova Etiqueta</v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field v-model="name_tag" label="Nome da Etiqueta" color="#940CC4" outlined hide-details prepend-inner-icon="mdi-robot-outline" class="mb-5 pl-2" style="background: #FFF; border-radius: 50px;"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions v-if="this.id === ''">
                  <v-btn
                  variant="outlined"
                  color="#8934eb"
                  width="65%"
                  v-on:click="addTags"
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
    import services from '@/services/Services';
    export default {
      name: 'CardTagsList',
      data () {
        return {
          id: '',
          name_tag: '',
          type_bot: '',
          dialog: false,
          dialogDelete: false,
          model: false,
          tags_list: []
        }
      },
      methods: {
        async addTags() {
            console.log(this.name_tag)
          const res = await services.addTags({
            tag_name: this.name_tag,
            status: 'Published'
          })
          if (res.status === 200) {
            alert('Etiqueta criada com Sucesso');
            this.listTags()
            this.dialog = false
          } else {
            alert('Informações incorretas');
          }
        },
        async editClientes() {
          const res = await services.editClientes({
            id: this.id,
            bot_name: this.name_bot,
            bot_type: this.type_bot
          })
          if (res.status === 200) {
            alert('Etiqueta alterada com Sucesso');
            this.listClientes()
            this.dialog = false
            this.id = ''
            this.name_bot = ''
            this.type_bot = ''
          } else {
            alert('Informações incorretas');
          }
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
        async deleteClientes() {
          const res = await services.deleteClientes(this.id)
          if (res.status === 204) {
            alert('Etiqueta deletada com Sucesso');
            this.listClientes()
            this.dialogDelete = false
          } else {
            alert('Informações incorretas');
          }
        },
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
        this.listTags()
      }
    }
    </script>