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
						Entrar
					</v-card-title>
						<v-form style="width: 55%;">
							<v-text-field v-model="user.email" label="Digite seu email" variant="outlined" hide-details prepend-inner-icon="mdi-email-outline" class="mb-2" style="height: 80px;"></v-text-field>
							<v-text-field
							style="height: 80px;"
							variant="outlined"
							label="Digite sua senha"
							hide-details
							prepend-inner-icon="mdi-key-outline"
								v-model="user.password"
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
						v-on:click="login"
						>
							<span>Entrar</span>
						</v-btn>
						<v-btn
						width="49%"
						v-on:click="$router.push('Register')"
						>
							<span>Registrar</span>
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
	// import services from '../services/Services';
	import { useAuthStore } from "@/store/auth";
	import { useRouter } from 'vue-router'
import Register from "./Register.vue";

	export default {
		data () {
			return {
				qrImg: '',
				show1: false,
				user: {
					email: '',
					password: '',
				},
				rules: {
					required: (value) => !!value || 'Required.',
					min: (v) => v.length >= 8 || 'Min 8 characters',
					emailMatch: () => ('The email and password you entered don\'t match'),
				},
			}
		},
		setup() {
			const authStore = useAuthStore();
			const router = useRouter();

			// expose to template and other options API hooks
			return {
				authStore,
				router
			}
		},
		methods: {
			login() {
				this.authStore
					.login(this.user)
					.then((_response) => this.router.push("/bots"))
					.catch((error) => console.log("API error", error));
			}
		}
	}
</script>
  