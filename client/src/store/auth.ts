import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { getUserApi, loginApi, logoutApi } from "../api/auth/Auth";
import api from "../api/axios";

interface LoginPayload {
	email: string;
	password: string;
}

interface AuthUser {
	id: number;
	email: string;
	firstname?: string;
	lastname?: string;
	avatar?: string;
	username?: string;
	role: "user" | "admin" | "creator";
}

export const useAuthStore = defineStore(
	"auth",
	() => {
		const token = ref();

		const user = ref<AuthUser | null>(null);

		const isAuthenticated = computed(() => !!token.value);

		const isAdmin = computed(() => user.value?.role === "admin");

		async function login(payload: LoginPayload) {
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

		async function regeister() {}

		async function fetchUser() {
			if (!token.value) return;

			try {
				const { data } = await getUserApi();

				user.value = data.user;
			} catch (error) {}
		}

		async function logout() {
			const data = await logoutApi();

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
			logout,
		};
	},
	{
		persist: true,
	},
);
