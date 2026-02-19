<script setup lang="ts">
export type Trend = "up" | "down";

export interface CompanyRow {
	id: number;
	company: {
		name: string;
		website: string;
		logo?: string;
	};
	category: {
		name: string;
		icon?: string;
	};
	views: {
		value: string;
		subtitle: string;
	};
	revenue: string;
	sales: {
		percentage: number;
		trend: Trend;
	};
}

defineProps<{
	rows: CompanyRow[];
}>();
</script>

<template>
	<div class="w-full overflow-x-auto rounded-2xl bg-white shadow-sm p-6 space-y-6">
		<div class="font-bold text-lg">
			<slot />
		</div>
		<table class="w-full text-left">
			<thead class="bg-black/80 text-xs uppercase tracking-wide text-white">
				<tr>
					<th class="px-6 py-3 font-medium">Brand</th>
					<th class="px-6 py-3 font-medium">Category</th>
					<th class="px-6 py-3 font-medium">Views</th>
					<th class="px-6 py-3 font-medium">Revenue</th>
					<th class="px-6 py-3 font-medium">Sales</th>
				</tr>
			</thead>

			<tbody class="divide-y divide-black/10">
				<tr v-for="row in rows" :key="row.id" class="hover:bg-gray-50 transition-colors">
					<td class="px-6 py-3">
						<div class="flex items-center gap-3">
							<div
								class="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold">
								<img v-if="row.company.logo" :src="row.company.logo" class="h-6 w-6 object-contain" />
								<span v-else>
									{{ row.company.name.charAt(0) }}
								</span>
							</div>

							<div>
								<p class="font-medium text-gray-900">
									{{ row.company.name }}
								</p>
								<p class="text-xs text-gray-500">
									{{ row.company.website }}
								</p>
							</div>
						</div>
					</td>

					<td class="px-6 py-3">
						<div class="flex items-center gap-2 text-gray-700">
							<span class="h-6 w-6 rounded-md bg-gray-100 flex items-center justify-center text-xs">
								<img v-if="row.category.icon" :src="row.category.icon" class="h-4 w-4" />
							</span>
							<span>{{ row.category.name }}</span>
						</div>
					</td>

					<td class="px-6 py-3">
						<p class="font-semibold text-gray-900">
							{{ row.views.value }}
						</p>
						<p class="text-xs text-gray-500">
							{{ row.views.subtitle }}
						</p>
					</td>

					<td class="px-6 py-4 font-semibold text-gray-900">
						{{ row.revenue }}
					</td>

					<td class="px-6 py-3">
						<div class="flex items-center gap-2 font-semibold">
							<span>{{ row.sales.percentage }}%</span>

							<svg
								v-if="row.sales.trend === 'up'"
								class="h-4 w-4 text-green-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path stroke-width="2" d="M5 15l7-7 7 7" />
							</svg>

							<svg
								v-else
								class="h-4 w-4 text-red-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
