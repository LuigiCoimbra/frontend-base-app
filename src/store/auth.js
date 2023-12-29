import { defineStore } from 'pinia'
import services from '@/services/Services';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    /* Initialize state from local storage to enable user to stay logged in */
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    async login(credential) {
        const res = await services.login({
            email: credential.email,
            password: credential.password
        })
        if (res.status === 200) {
            this.user = res
            this.token = res.data.data.access_token
            localStorage.setItem('user', JSON.stringify(this.user))
            localStorage.setItem('token', this.token)
            console.log(localStorage.getItem('token'))
        }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }
})