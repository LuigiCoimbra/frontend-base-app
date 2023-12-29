<template>
  <router-view />
</template>

<script>
  import Api from './services/Api';
  import { useRouter } from 'vue-router'

  export default {
    setup() {
			const router = useRouter();

			// expose to template and other options API hooks
			return {
				router
			}
		},
    mounted () {
      if (localStorage.getItem('token') != undefined) {
        Api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      } else {
        this.router.push("/login")
      }
    }
  }
</script>
