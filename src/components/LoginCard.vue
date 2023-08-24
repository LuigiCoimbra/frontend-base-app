<template>
	<v-card>
		<v-card-title>
			Login
		</v-card-title>
		<v-card-subtitle>
			Realize o seu Login
		</v-card-subtitle>
		<v-card-text>
			<v-form>
				<v-text-field v-model="email" label="Digite seu email" color="#940CC4" outlined hide-details prepend-inner-icon="mdi-email-outline" class="mb-5 pl-2" style="background: #FFF; border-radius: 50px;"></v-text-field>
				<v-text-field
				class="pl-2"
				outlined
				label="Digite sua senha"
				hide-details
				prepend-inner-icon="mdi-key-outline"
					v-model="password"
					:append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
					:rules="[rules.required, rules.min]"
					:type="show1 ? 'text' : 'password'"
					name="input-10-1"
					hint="Ao menos 8 caracteres"
					@click:append="show1 = !show1"
					style="background: #FFF; border-radius: 50px;"
				></v-text-field>
				<v-checkbox
				color="#940CC4"
				hide-details
				v-model="checkbox"
				label="Lembrar senha"
				></v-checkbox>
			</v-form>
		</v-card-text>
		<v-card-actions style="display: flex; justify-content: center; align-items: center;">
			<v-btn
				variant="outlined"
				color="#8934eb"
        width="65%"
        v-on:click="login"
        >
          <span>Entrar</span>
        </v-btn>
				<!-- <v-btn
				width="49%"
				href="./register"
				>
					<span>Registrar</span>
				</v-btn> -->
		</v-card-actions>
	</v-card>
</template>
<script>
import services from '../services/Services';

export default {
	name: 'LoginCard',
	data () {
			return {
				show1: false,
        email: '',
        password: '',
        rules: {
          required: (value) => !!value || 'Requerido.',
          min: (v) => v.length >= 8 || 'Min 8 caracteres',
        },
			}
	},
	methods: {
      async login() {
        const res = await services.login({
					email: this.email,
        	password: this.password,
				})
				console.log(res)
        if (res.status === 200) {
					// localStorage.setItem('token', res.data.access_token);
					this.$router.push('/');
				} else {
					alert('Login Invalido');
				}
      },
    }
}
</script>