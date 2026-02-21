<script setup lang="ts">
import Navigation from "../components/layout/Navigation.vue";
import Sidebar from "../components/layout/Sidebar.vue";
import { navigationLinks } from "../constants/links";
import { userDashboardLinks, userLinksDropdown } from "../constants/user/links";
</script>

<template>
	<div class="flex h-screen">
		<Sidebar :links="userDashboardLinks" class="pt-20" />

		<Navigation title="Muphy" :links="navigationLinks" :account-links="userLinksDropdown" class="h-fit" />
	</div>

	<main class="">
		<RouterView />
	</main>
</template>
