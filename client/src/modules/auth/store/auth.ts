import { defineStore } from "pinia";
import { computed, ref } from "vue";
import api from "@/api/axios";
import { getUserApi, loginApi, logoutApi, registerApi } from "../services/Auth";
import type { AuthUser, LoginPayload, RegisterPayload } from "../types/auth";
import type { ApiError } from "@/types/api";
import { extractApiError } from "@/utils/error/ExtractApiError";

export const useAuthStore = defineStore(
	"auth",
	() => {
		const token = ref();

		const user = ref<AuthUser | null>(null);

		const error = ref<ApiError | null>(null);

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

		function clearError() {
			error.value = null;
		}

		async function login(payload: LoginPayload) {
			clearError();

			try {
				const { data } = await loginApi(payload);

				token.value = data.data.token;

				user.value = data.data.user;

				setAuthorizationHeader(data.data.token);

				return true;
			} catch (err) {
				error.value = extractApiError(err);

				return false;
			}
		}

		async function register(payload: RegisterPayload) {
			clearError();

			try {
				const { data } = await registerApi(payload);

				token.value = data.data.token;

				user.value = data.data.user;

				setAuthorizationHeader(data.data.token);

				return true;
			} catch (err) {
				error.value = extractApiError(err);

				return false;
			}
		}

		async function fetchCurrentUser() {
			clearError();

			if (!token.value) return;

			try {
				const { data } = await getUserApi();

				user.value = data.data.user;

				return true;
			} catch (err) {
				error.value = extractApiError(err);
			}
		}

		async function logout() {
			clearError();

			try {
				await logoutApi();
			} catch (err) {
				error.value = extractApiError(err);
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

			error,

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
