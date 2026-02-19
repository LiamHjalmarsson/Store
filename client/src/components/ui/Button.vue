<script setup lang="ts">
defineProps<{
	type?: "button" | "submit" | "reset";
	variant?: "primary" | "secondary";
}>();
</script>

<template>
	<button
		:type="type || 'button'"
		:class="[
			'w-full py-3 rounded-2xl font-semibold transition',
			variant === 'secondary'
				? 'bg-gray-200 text-black hover:bg-gray-300'
				: 'bg-black/80 text-white hover:bg-black',
		]">
		<slot />
	</button>
</template>
