<script setup lang="ts">
import Navigation from "../components/layout/Navigation.vue";
import Sidebar from "../components/layout/Sidebar.vue";
import { navigationLinks, accountLinksDropdown, accountLinks } from "../constants/links";
</script>

<template>
	<div class="flex h-screen">
		<Sidebar :links="accountLinks" class="pt-20" />

		<Navigation title="Muphy" :links="navigationLinks" :account-links="accountLinksDropdown" class="h-fit" />
	</div>

	<main class="">
		<RouterView />
	</main>
</template>
