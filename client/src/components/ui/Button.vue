<script setup lang="ts">
defineProps<{
	type?: "button" | "submit" | "reset";
	variant?: "primary" | "secondary" | "white" | "black";
}>();
</script>

<template>
	<button
		:type="type || 'button'"
		class="w-full py-1.5 px-12 rounded-2xl font-semibold transition flex items-center text-center justify-center space-x-3 cursor-pointer">
		<slot />
	</button>
</template>
