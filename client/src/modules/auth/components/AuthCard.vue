<script setup lang="ts">
defineProps<{ title: string; subtitle: string }>();
</script>

<template>
	<div class="p-6 space-y-12 w-fit">
		<div class="space-y-6">
			<h1 class="text-7xl font-bold">
				{{ title }}
			</h1>
			<p>
				{{ subtitle }}
			</p>
		</div>

		<slot />

		<div class="text-center">
			<slot name="footer" />
		</div>
	</div>
</template>
