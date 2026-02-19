<script setup lang="ts">
import { ref } from "vue";
import AuthCard from "../../components/auth/AuthCard.vue";
import AuthLayout from "../../components/auth/AuthLayout.vue";
import Button from "../../components/ui/Button.vue";
import Input from "../../components/ui/Input.vue";
import { login } from "../../api/auth/Auth";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");

const password = ref("");

async function handleLogin() {
	try {
		const payload = {
			email: email.value,
			password: password.value,
		};

		const res = await login(payload);

		const token = res.data.token;

		localStorage.setItem("token", token);

		router.push({ name: "home" });
	} catch (error) {}
}
</script>

<template>
	<AuthLayout>
		<AuthCard title="Welcome back" subtitle="Motivation">
			<form @submit.prevent="handleLogin" class="space-y-6">
				<Input v-model="email" label="Email address" placeholder="Enter your email" required />

				<Input v-model="password" type="password" label="Password" required />

				<div class="text-end text-blue-500 font-semibold">
					<RouterLink :to="{ name: 'forgot-password' }"> Forgot Password? </RouterLink>
				</div>

				<Button type="submit"> Sign in </Button>
			</form>

			<template #footer>
				Don't have an account?
				<RouterLink :to="{ name: 'register' }" class="text-blue-500 font-semibold"> Sign up </RouterLink>
			</template>
		</AuthCard>
	</AuthLayout>
</template>
