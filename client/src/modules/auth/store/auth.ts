import { defineStore } from "pinia";
import { computed, ref } from "vue";
import api from "@/api/axios";
import { getUserApi, loginApi, logoutApi, registerApi } from "../services/Auth";
import type { AuthUser, LoginPayload, RegisterPayload } from "../types/auth";

export const useAuthStore = defineStore(
	"auth",
	() => {
		const token = ref();

		const user = ref<AuthUser | null>(null);

		const isAuthenticated = computed(() => !!token.value);

		const isAdmin = computed(() => user.value?.role === "admin");

		const isCreator = computed(() => user.value?.role === "creator");

		function setAuthorizationHeader(accessToken: string | null) {
			if (accessToken) {
				api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

				return;
			}

			delete api.defaults.headers.common.Authorization;
		}

		function clearAuth() {
			user.value = null;

			token.value = null;

			setAuthorizationHeader(null);
		}

		async function login(payload: LoginPayload) {
			try {
				const { data } = await loginApi(payload);

				token.value = data.token;

				user.value = data.user;

				setAuthorizationHeader(data.token);

				return true;
			} catch (error) {
				console.log(error);
			} finally {
			}
		}

		async function register(payload: RegisterPayload) {
			try {
				const { data } = await registerApi(payload);

				token.value = data.token;

				user.value = data.user;

				setAuthorizationHeader(data.token);

				return true;
			} catch (error) {
				console.log(error);
			}
		}

		async function fetchCurrentUser() {
			if (!token.value) return;

			try {
				const { data } = await getUserApi();

				user.value = data.user;
			} catch (error) {
				console.log(error);
			}
		}

		async function logout() {
			try {
				await logoutApi();
			} catch (error) {
				console.log(error);
			} finally {
				clearAuth();
			}
		}

		return {
			token,
			user,

			isAuthenticated,
			isAdmin,
			isCreator,

			login,
			register,
			logout,
			fetchCurrentUser,
		};
	},
	{
		persist: true,
	},
);
