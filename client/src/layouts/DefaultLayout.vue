<script setup lang="ts">
import Navigation from "../components/layout/Navigation.vue";
import { navigationLinks, accountLinks } from "../constants/links";
</script>

<template>
	<Navigation title="Muphy" :links="navigationLinks" :account-links="accountLinks" />

	<main class="">
		<RouterView />
	</main>
</template>
