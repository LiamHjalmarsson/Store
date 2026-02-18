<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getUsers, type User } from "../../../api/user/user";
import Card from "../../../components/ui/card.vue";

const users = ref<User[]>([]);

onMounted(async () => {
	const res = await getUsers();

	users.value = res.data.users;
});
</script>

<template>
	<div class="container mx-auto">
		<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-6">
			<Card v-for="user in users" :key="user.id" class="p-1.5 space-y-8 shadow rounded-4xl">
				<template #icon>
					<div class="absolute left-5 -bottom-4 w-16 h-16 rounded-full">
						<div class="relative">
							<img :src="user.avatar" class="rounded-full h-full w-full" />
							<div class="h-3 w-3 bg-green-400 rounded-full absolute right-0.5 bottom-1.5" />
						</div>
					</div>
				</template>

				<template #heading>
					<div>
						<span class="block font-medium">
							{{ user.firstname }}
							{{ user.lastname }}
						</span>
						<span class="block text-xs">{{ user.email }}</span>
					</div>
					<div class="w-6 h-6 border/5 rounded-full flex justify-center items-center bg-black/5"></div>
				</template>

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
			</Card>
		</div>
	</div>
</template>
