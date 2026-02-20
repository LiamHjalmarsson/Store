<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../store/auth";
import type { Link } from "../../types/shared";
import { ref } from "vue";
import { UserIcon } from "@hugeicons/core-free-icons";
import Button from "../ui/Button.vue";
import Icon from "../ui/Icon.vue";
import Dropdown from "../ui/Dropdown.vue";

interface Navigation {
	title: string;
	links?: Link[];
	accountLinks: Link[];
}

defineProps<Navigation>();

const authStore = useAuthStore();

const { isAdmin, isAuthenticated, user } = storeToRefs(authStore);

const { logout } = authStore;

const showDropdown = ref(false);

function handleToggleDropdown() {
	showDropdown.value = !showDropdown.value;
}

async function handleLogout() {
	await logout();

	showDropdown.value = false;
}
</script>

<template>
	<nav class="bg-black text-white w-full fixed flex justify-between items-center z-50">
		<div class="w-44 text-center">
			<RouterLink :to="{ name: 'home' }">
				{{ title }}
			</RouterLink>
		</div>

		<ul class="space-x-12 py-6 flex items-center justify-center flex-1">
			<li v-for="link in links" :key="link.label" class="font-bold capitalize">
				<RouterLink class="flex space-x-3 items-center justify-center" :to="link.href">
					{{ link.label }}
				</RouterLink>
			</li>
		</ul>

		<div class="relative w-52 flex items-center justify-center">
			<div v-if="isAuthenticated">
				<Button @click="handleToggleDropdown">
					<div v-if="user?.avatar">
						<img :src="user.avatar" alt="" class="w-10 h-10 rounded-full" />
					</div>
					<Icon v-else :icon="UserIcon" :size="24" />
					<p>
						{{ user?.username }}
					</p>
				</Button>
			</div>
			<div v-else="isAuthenticated">
				<RouterLink :to="{ name: 'login' }" class="flex gap-3">
					Login <Icon :icon="UserIcon" :size="24" />
				</RouterLink>
			</div>

			<Dropdown v-if="showDropdown">
				<div class="space-y-3">
					<div v-for="link in accountLinks" :key="link.label" class="font-medium">
						<RouterLink :to="{ name: link.name }">
							{{ link.label }}
						</RouterLink>
					</div>
				</div>
				<button class="font-medium border-t text-start w-full pt-3 cursor-pointer" @click="handleLogout">
					Logout
				</button>
			</Dropdown>
		</div>
	</nav>
</template>
