<template>
  <NavBar />
  <CardBotList />
</template>

<script>
  import CardBotList from '@/components/CardBotList';
  import NavBar from '@/components/NavBar.vue';


  export default {
    components: {CardBotList, NavBar},
    data () {
      return {
        qrImg: ''
      }
    },
  }
</script>
