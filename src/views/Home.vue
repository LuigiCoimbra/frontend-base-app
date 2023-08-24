<template>
  <!-- <HelloWorld /> -->
  <v-btn
    min-width="164"
    rel="noopener noreferrer"
    target="_blank"
    variant="text"
    v-on:click="login"
  >
    <v-icon
      icon="mdi-view-dashboard"
      size="large"
      start
    />

    Components
  </v-btn>
  <img height="300" :src="qrImg" />
  <CardBotList />
</template>

<script>
  import CardBotList from '@/components/CardBotList';


  export default {
    components: {CardBotList},
    data () {
      return {
        qrImg: ''
      }
    },
  }
</script>
