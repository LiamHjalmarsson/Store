<script setup lang="ts">
import { useSlots } from "vue";

const slots = useSlots();

const shouldShowStats = () => !!slots.stats;
</script>

<template>
	<div class="p-1.5 space-y-8 shadow rounded-4xl">
		<div class="h-32 w-full bg-black/80 relative rounded-3xl">
			<slot name="icon" />
		</div>
		<div class="px-2 space-y-6">
			<div class="flex justify-between items-center">
				<slot name="heading" />
			</div>

			<div class="grid grid-cols-3" v-if="shouldShowStats()">
				<slot name="stats" />
			</div>

			<button
				class="w-full py-3 px-6 bg-black text-white rounded-full cursor-pointer duration-150 hover:bg-black/80">
				See more
			</button>
		</div>
	</div>
</template>
