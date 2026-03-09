<script setup lang="ts">
import Navigation from "../components/layout/Navigation.vue";
import Sidebar from "../components/layout/Sidebar.vue";
import { navigationLinks } from "../constants/links";
import { userDashboardLinks, userLinksDropdown } from "../constants/user/links";
</script>

<template>
	<div class="flex h-screen">
		<Sidebar :links="userDashboardLinks" class="pt-20" />

		<div class="flex-1">
			<Navigation title="Muphy" :links="navigationLinks" :account-links="userLinksDropdown" class="h-fit" />

			<main class="">
				<RouterView />
			</main>
		</div>
	</div>
</template>
