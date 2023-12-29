<template>
    <NavBar />
    <CardContactList />
</template>
<script>
  import CardContactList from '@/components/CardContactList';
  import NavBar from '@/components/NavBar.vue';
  
  export default {
    components: {CardContactList, NavBar},
    data () {
      return {
        qrImg: ''
      }
    },
  }
</script>
