<script setup lang="ts">
import { useSlots } from "vue";
import type { User } from "../../api/user/user";

defineProps<{ user: User }>();

const slots = useSlots();

const shouldShowStats = () => !!slots.stats;
</script>

<template>
	<div class="p-1.5 space-y-8 shadow rounded-4xl">
		<div class="h-32 w-full bg-black/80 relative rounded-3xl">
			<div class="absolute left-5 -bottom-4 w-16 h-16 rounded-full">
				<div class="relative">
					<img :src="user.avatar" class="rounded-full h-full w-full" />
				</div>
			</div>
		</div>
		<div class="px-2 space-y-6">
			<div class="flex justify-between items-center">
				<div>
					<span class="block font-medium">
						{{ user.firstname }}
						{{ user.lastname }}
					</span>
					<span class="block text-xs">{{ user.email }}</span>
				</div>
				<div class="w-6 h-6 border/5 rounded-full flex justify-center items-center bg-black/5"></div>
			</div>

			<div class="grid grid-cols-3" v-if="shouldShowStats()">
				<slot name="stats" />
			</div>

			<button
				class="w-full py-3 px-6 bg-black text-white rounded-full cursor-pointer duration-150 hover:bg-black/80">
				Visit
			</button>
		</div>
	</div>
</template>
