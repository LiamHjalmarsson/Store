<script setup lang="ts">
import AuthCard from "../../components/auth/AuthCard.vue";
import AuthLayout from "../../components/auth/AuthLayout.vue";
import Button from "../../components/ui/Button.vue";
</script>

<template>
	<AuthLayout>
		<AuthCard title="Create an account" subtitle="Motivation">
			<form class="space-y-6">
				<div class="relative">
					<label for="" class="absolute top-3 left-6 hidden"></label>
					<input
						placeholder="Username"
						class="px-6 py-3 border border-black/10 w-full rounded-xl outline-0" />
				</div>

				<div class="relative">
					<label for="" class="absolute top-3 left-6 hidden"></label>
					<input placeholder="Email" class="px-6 py-3 border border-black/10 w-full rounded-xl outline-0" />
				</div>

				<div class="relative">
					<label for="" class="absolute top-3 left-6 hidden"></label>
					<input
						placeholder="Password"
						class="px-6 py-3 border border-black/10 w-full rounded-xl outline-0" />
				</div>

				<div class="relative">
					<label for="" class="absolute top-3 left-6 hidden"></label>
					<input
						placeholder="Confirm Password"
						class="px-6 py-3 border border-black/10 w-full rounded-xl outline-0" />
				</div>

				<Button type="submit"> Register account </Button>
			</form>

			<template #footer>
				Already have an account ?
				<RouterLink :to="{ name: 'login' }" class="text-blue-500 font-semibold"> Login </RouterLink>
			</template>
		</AuthCard>
	</AuthLayout>
</template>
