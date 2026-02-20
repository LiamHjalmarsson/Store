<script setup lang="ts">
import { useRouter } from "vue-router";
import AuthCard from "../../components/auth/AuthCard.vue";
import AuthLayout from "../../components/auth/AuthLayout.vue";
import Button from "../../components/ui/Button.vue";
import { useAuthStore } from "../../store/auth";
import { ref } from "vue";
import Input from "../../components/ui/Input.vue";

const { register } = useAuthStore();

const router = useRouter();

const email = ref();

const password = ref();

const username = ref();

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
