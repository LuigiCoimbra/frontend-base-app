<template>
<v-container class="d-flex align-center flex-column">
    <v-card width="85%">
        <v-card-actions>
          <v-btn density="comfortable" icon="mdi-plus" @click="dialog = true;"></v-btn>
        </v-card-actions>
        <v-card-title>Lista de Clientes</v-card-title>
        <v-card-subtitle>Crie, edite e gerencie seus Clientes</v-card-subtitle>
        <v-card-text>
          <v-table>
              <thead>
                  <tr>
                      <th class="text-left">Nome</th>
                      <th class="text-left">Email</th>
                      <th class="text-left">Telefone</th>
                      <th class="text-left">Ações</th>
                  </tr>
              </thead>
              <tbody>
                  <tr
                      v-for="item in bot_list"
                      :key="item.id"
                  >
                      <td>{{ item.nome }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.telefone }}</td>
                      <!-- <td>
                        <v-switch
                          v-model="model"
                          hide-details
                          inset
                          color="primary"
                        ></v-switch>
                      </td> -->
                      <td>
                        <v-btn class="mr-1" density="compact" icon="mdi-square-edit-outline" @click="dialog = true; name_bot = item.nome_bot; type_bot = item.tipo_bot; id = item.id"></v-btn>
                        <v-btn density="compact" icon="mdi-delete-outline" @click="dialogDelete = true; id = item.id"></v-btn>
                      </td>
                  </tr>
              </tbody>
          </v-table>
        </v-card-text>
        <v-dialog
          v-model="dialog">
          <v-card>
            <v-card-title>Criar novo Clientes</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field v-model="nome" label="Nome" color="#940CC4" outlined hide-details prepend-inner-icon="mdi-robot-outline" class="mb-5 pl-2" style="background: #FFF; border-radius: 50px;"></v-text-field>
                <v-text-field v-model="email" label="Email" color="#940CC4" outlined hide-details prepend-inner-icon="mdi-robot-outline" class="mb-5 pl-2" style="background: #FFF; border-radius: 50px;"></v-text-field>
                <v-text-field v-model="telefone" label="Telefone" color="#940CC4" outlined hide-details prepend-inner-icon="mdi-robot-outline" class="mb-5 pl-2" style="background: #FFF; border-radius: 50px;"></v-text-field>
                <v-text-field v-model="endereco" label="Endereço" color="#940CC4" outlined hide-details prepend-inner-icon="mdi-robot-outline" class="mb-5 pl-2" style="background: #FFF; border-radius: 50px;"></v-text-field>
                <v-text-field v-model="cep" label="CEP" color="#940CC4" outlined hide-details prepend-inner-icon="mdi-robot-outline" class="mb-5 pl-2" style="background: #FFF; border-radius: 50px;"></v-text-field>
                <v-select
                  label="Select"
                  v-model="type_bot"
                  :items="bot_types"
                  item-title="type_name"
                  item-value="type_id"
                ></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions v-if="this.id === ''">
              <v-btn
              variant="outlined"
              color="#8934eb"
              width="65%"
              v-on:click="addCliente"
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
  name: 'CardBotList',
  data () {
    return {
      id: '',
      nome: '',
      email: '',
      telefone: '',
      endereco: '',
      cep: '',
      dialog: false,
      dialogDelete: false,
      model: false,
      bot_list: [],
      bot_types: []
    }
  },
  methods: {
    async addCliente() {
      const res = await services.addCliente({
        nome: this.nome,
        email: this.email,
        telefone: this.telefone,
        endereco: this.endereco,
        cep: this.cep
      })
      if (res.status === 200) {
        alert('Bot criado com Sucesso');
        this.listClientes()
        this.dialog = false
      } else {
        alert('Informações incorretas');
      }
    },
    async editClientes() {
      const res = await services.editClientes({
        id: this.id,
        nome: this.nome,
        email: this.email,
        telefone: this.telefone,
        endereco: this.endereco,
        cep: this.cep
      })
      if (res.status === 200) {
        alert('Bot alterado com Sucesso');
        this.listClientes()
        this.dialog = false
        this.id = ''
        this.name_bot = ''
        this.type_bot = ''
      } else {
        alert('Informações incorretas');
      }
    },
    async listClientes() {
      const res = await services.listClientes()
      if (res.data.data) {
        this.bot_list = res.data.data.map((item) => ({
          id: item.id,
          nome: item.nome,
          email: item.email,
          telefone: item.telefone,
          endereco: item.endereco,
          cep: item.cep
        }));
        console.log(this.bot_list)
      } else {
        alert('Erro ao carregar dados');
      }
    },
    async deleteClientes() {
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
    this.listClientes()
    this.typeBot()
  }
}
</script>