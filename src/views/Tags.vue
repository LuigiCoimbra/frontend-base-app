<template>
    <NavBar />
    <CardTagsList />
</template>
<script>
  import CardTagsList from '@/components/CardTagsList';
  import NavBar from '@/components/NavBar.vue';
  
  export default {
    components: {CardTagsList, NavBar},
    data () {
      return {
        qrImg: ''
      }
    },
  }
</script>
