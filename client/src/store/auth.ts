import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
	getUserApi,
	loginApi,
	logoutApi,
	registerApi,
	type AuthUser,
	type loginRequest,
	type registerRequest,
} from "../api/auth/Auth";
import api from "../api/axios";

export const useAuthStore = defineStore(
	"auth",
	() => {
		const token = ref();

		const user = ref<AuthUser | null>(null);

		const isAuthenticated = computed(() => !!token.value);

		const isAdmin = computed(() => user.value?.role === "admin");

		async function login(payload: loginRequest) {
			try {
				const { data } = await loginApi(payload);

				token.value = data.token;

				api.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;

				await fetchUser();

				return true;
			} catch (error) {
				console.log(error);
			} finally {
			}
		}

		async function register(payload: registerRequest) {
			try {
				const { data } = await registerApi(payload);

				token.value = data.token;

				console.log(data);

				api.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;

				await fetchUser();

				return true;
			} catch (error) {}
		}

		async function fetchUser() {
			if (!token.value) return;

			try {
				const { data } = await getUserApi();

				user.value = data.user;
			} catch (error) {}
		}

		async function logout() {
			await logoutApi();

			user.value = null;

			delete api.defaults.headers.common["Authorization"];

			token.value = null;
		}

		return {
			token,
			user,

			isAuthenticated,
			isAdmin,

			login,
			register,
			logout,
		};
	},
	{
		persist: true,
	},
);
