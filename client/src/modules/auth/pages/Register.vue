<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import AuthLayout from "../components/AuthLayout.vue";
import AuthCard from "../components/AuthCard.vue";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";

const { register } = useAuthStore();

const router = useRouter();

const email = ref("");

const password = ref("");

const username = ref("");

async function handleRegister() {
	const success = await register({
		email: email.value,
		username: username.value,
		password: password.value,
	});

	if (success) {
		router.push({ name: "home" });
	}
}
</script>

<template>
	<AuthLayout>
		<AuthCard title="Create an account" subtitle="Motivation">
			<form @submit.prevent="handleRegister" class="space-y-6">
				<Input v-model="username" label="Username" required />

				<Input v-model="email" label="Email address" placeholder="Enter your email" required />

				<Input v-model="password" type="password" label="Password" required />

				<Button type="submit" class="bg-black text-white py-3"> Register account </Button>
			</form>

			<template #footer>
				Already have an account ?
				<RouterLink :to="{ name: 'login' }" class="text-blue-500 font-semibold"> Login </RouterLink>
			</template>
		</AuthCard>
	</AuthLayout>
</template>
