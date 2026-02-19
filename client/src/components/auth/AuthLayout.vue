<script setup lang="ts">
import image from "@/assets/images/bg.jpg";
</script>

<template>
	<main class="h-screen flex items-center justify-center p-12 space-x-12">
		<div class="flex-1 flex items-center justify-center">
			<slot />
		</div>

		<div class="flex-1 w-full h-full relative overflow-hidden rounded-2xl">
			<img :src="image" class="absolute w-full h-full object-cover" />
		</div>
	</main>
</template>
