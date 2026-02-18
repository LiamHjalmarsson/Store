<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getUsers, type User } from "../../../api/user/user";

const users = ref<User[]>([]);

onMounted(async () => {
	const res = await getUsers();

	users.value = res.data.users;
});
</script>

<template>
	<div class="container mx-auto p-6">
		<div class="grid grid-cols-2 gap-6">
			<div v-for="user in users" :key="user.id" class="p-1.5 space-y-8 shadow rounded-4xl">
				<div class="h-32 w-full bg-black/80 relative rounded-3xl">
					<div class="absolute left-5 -bottom-4 w-16 h-16 rounded-full">
						<div class="relative">
							<img :src="user.avatar" class="rounded-full h-full w-full" />
							<div class="h-3 w-3 bg-green-400 rounded-full absolute right-0.5 bottom-1.5" />
						</div>
					</div>
				</div>
				<div class="px-2 space-y-6">
					<div class="flex justify-between items-center">
						<div class="">
							<span class="block font-medium">
								{{ user.firstname }}
								{{ user.lastname }}
							</span>
							<span class="block text-xs">{{ user.email }}</span>
						</div>
						<div class="w-6 h-6 border/5 rounded-full flex justify-center items-center bg-black/5"></div>
					</div>

					<div class="grid grid-cols-3">
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
					</div>

					<button
						class="w-full py-3 px-6 bg-black text-white rounded-full cursor-pointer duration-150 hover:bg-black/80">
						See more
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
