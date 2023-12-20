<style>
.v-col {
	padding: 0 !important;
}
.gradient {
  width: 100%;
  height:100%;
}

.gradient {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
<template>
		<v-row style="margin: 0px; height: 100vh;">
		<v-col cols="4">
				<v-card style="padding: 10px; display: grid; gap: 10px; justify-items: center; height: 100%; align-content: center;" elevation="0">
					<v-card-title style="font-size: 45px;">
						Criar Conta
					</v-card-title>
						<v-form style="width: 55%;">
                            <div style="display: flex;">
                                <v-text-field v-model="fname" label="Digite seu nome" variant="outlined" hide-details style="height: 80px; width: 40%;"></v-text-field>
                                <v-text-field v-model="lname" label="Digite seu sobrenome" variant="outlined" hide-details style="height: 80px; width: 40%; margin-left: 5px;"></v-text-field>
                            </div>
							<v-text-field v-model="email" label="Digite seu email" variant="outlined" hide-details style="height: 80px;"></v-text-field>
                            <v-text-field v-model="celular" label="Digite seu celular" variant="outlined" hide-details style="height: 80px;"></v-text-field>
							<v-text-field
							style="height: 80px;"
							variant="outlined"
							label="Digite sua senha"
							hide-details
								v-model="password"
								:append-inner-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
								:rules="[rules.required, rules.min]"
								:type="show1 ? 'text' : 'password'"
								name="input-10-1"
								hint="Ao menos 8 caracteres"
								@click:append="show1 = !show1"
							></v-text-field>
                            <v-text-field
							style="height: 80px;"
							variant="outlined"
							label="Confirme sua senha"
							hide-details
								v-model="confirmPassword"
								:append-inner-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
								:rules="[rules.required, rules.min]"
								:type="show1 ? 'text' : 'password'"
								name="input-10-1"
								hint="Ao menos 8 caracteres"
								@click:append="show1 = !show1"
							></v-text-field>
							<v-checkbox
							hide-details
							v-model="checkbox"
							label="Lembrar senha"
							></v-checkbox>
						</v-form>
					<v-card-actions style="display: flex; justify-content: center; align-items: center;">
						<v-btn
							variant="outlined"
							color="#8934eb"
						width="49%"
						v-on:click="register"
						>
							<span>Registrar</span>
						</v-btn>
						<v-btn
						width="49%"
						href="./login"
						>
							<span>Voltar</span>
						</v-btn>
					</v-card-actions>
				</v-card>
		</v-col>
		<v-col cols="8">
			<div class="gradient"></div>
		</v-col>
	</v-row>
</template>
  
<script>
	import services from '../services/Services';

	export default {
		data () {
			return {
				qrImg: '',
				show1: false,
                confirmPassword: '',
				rules: {
					required: (value) => !!value || 'Required.',
					min: (v) => v.length >= 8 || 'Min 8 characters',
					emailMatch: () => ('The email and password you entered don\'t match'),
				},
				fname: '',
				lname: '',
				email: '',
				celular: '',
				password: ''
			}
		},
		methods: {
			async register() {
				const res = await services.register({
					first_name: this.fname,
					last_name: this.lname,
					telefone: this.celular,
					email: this.email,
					password: this.password
				})
				console.log(res.status)
				this.$router.push('Login')
			},
		}
	}
</script>
  