<script setup lang="ts">
import Navigation from "../components/layout/Navigation.vue";
import { navigationLinks } from "../constants/links";
import { userLinksDropdown } from "../constants/user/links";
</script>

<template>
	<Navigation title="Muphy" :links="navigationLinks" :account-links="userLinksDropdown" />

	<main class="">
		<RouterView />
	</main>
</template>
