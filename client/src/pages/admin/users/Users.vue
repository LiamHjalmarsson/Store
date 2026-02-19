<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getUsers, type User } from "../../../api/user/user";
import UserCard from "../../../components/ui/UserCard.vue";

const users = ref<User[]>([]);

onMounted(async () => {
	const res = await getUsers();

	users.value = res.data.users;
});
</script>

<template>
	<div class="container mx-auto">
		<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-6">
			<UserCard v-for="user in users" :key="user.id" :user class="p-1.5 space-y-8 shadow rounded-4xl">
				<template #stats>
					<div class="flex flex-col items-center">
						<div class="font-bold">10+</div>
						<div class="text-xs text-black/60">Reviews</div>
					</div>
					<div class="flex flex-col items-center">
						<div class="font-bold">50+</div>
						<div class="text-xs text-black/60">Orders</div>
					</div>
					<div class="flex flex-col items-center">
						<div class="font-bold">5000</div>
						<div class="text-xs text-black/60">Spent</div>
					</div>
				</template>
			</UserCard>
		</div>
	</div>
</template>
