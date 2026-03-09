import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { User } from "../types/user";
import { getUsers } from "../services/user";

export const useUserStore = defineStore("users", () => {
	const users = ref<User[]>([]);

	const creators = computed(() => users.value.filter((user) => user.role === "creator"));

	async function fetchUsers() {
		try {
			const { data } = await getUsers();

			users.value = data.users;
		} catch (error) {
			console.log(error);
		}
	}

	return { users, creators, fetchUsers };
});
