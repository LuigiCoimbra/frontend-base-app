<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          expand-on-hover
          rail
        >
          <v-list>
            <v-list-item
              prepend-avatar="@/assets/default-profile.jpg"
              :title="this.username"
              :subtitle="this.celular"
            ></v-list-item>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-robot" title="Bots" value="bot_list" :to="'/bots'"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group" title="Contatos" value="contatos" :to="'/contacts'"></v-list-item>
            <v-list-item prepend-icon="mdi-tag" title="Etiquetas" value="tags" :to="'/etiquetas'"></v-list-item>
          </v-list>
          <template v-slot:append>
            <v-list density="compact" nav>
              <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" @click="logout()"></v-list-item>
            </v-list>
          </template>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </template>
  <script>
    import services from '@/services/Services';
    import { useRouter } from 'vue-router'
    export default {
      name: 'navBar',
      data () {
        return {
          username: '',
          email: '',
          celular: ''
        }
      },
      setup() {
        const router = useRouter();

        // expose to template and other options API hooks
        return {
          router
        }
      },
      methods: {
        async getUser() {
          const res = await services.getUser()
          if(res.data.data) {
            console.log(res)
              this.username = res.data.data.first_name + ' ' + res.data.data.last_name
              this.email = res.data.data.email
              this.celular = res.data.data.telefone
          } else {
            alert('Erro ao carregar dados');
          }
        },
        async logout(){
          const res = await services.logout()
          if (res.data == ''){
            console.log(res)
            this.router.push("/login")
          } else {
            alert('Erro ao carregar dados');
          }
        }
      },
      mounted () {
        this.getUser()
      }
    }
  </script>