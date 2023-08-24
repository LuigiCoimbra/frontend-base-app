<template>
	<v-container>
		<v-row
		align="center"
		style="height: 100vh;">
			<v-col
			cols="6"
			offset="3">
				<LoginCard />
			</v-col>
		</v-row>
	</v-container>
</template>
  
<script>
	import LoginCard from '@/components/LoginCard';
	import services from '../services/Services';

	export default {
		components: {LoginCard},
		data () {
			return {
				qrImg: ''
			}
		},
		methods: {
			async login() {
				const res = await services.login()
				console.log(res.status)
				if (res.status === 203) {
					this.qrImg = res.data
					// setInterval(services.login, 5000)
					console.log(res)
				}
				if (res.status === 200) {
					alert('Autenticado')
					console.log(res)
				}
			},
		}
	}
</script>
  