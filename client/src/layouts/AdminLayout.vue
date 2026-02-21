<script setup lang="ts">
import Sidebar from "../components/layout/Sidebar.vue";
import { adminDashboardLinks } from "../constants/admin/links";
</script>

<template>
	<Sidebar :links="adminDashboardLinks" />

	<main class="ml-64 flex-1 p-8">
		<RouterView />
	</main>
</template>
