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
              title="User Name"
              subtitle="email@email.com"
            ></v-list-item>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-robot" title="Bots" value="bot_list"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group" title="Contatos" value="contatos"></v-list-item>
            <v-list-item prepend-icon="mdi-tag" title="Etiquetas" value="tags"></v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </template>