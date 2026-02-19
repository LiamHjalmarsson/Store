<script setup lang="ts">
import {
	PackageIcon,
	Analytics03Icon,
	UserIcon,
	Dollar01Icon,
	ChartUpIcon,
	Chart01Icon,
	ChartDownIcon,
} from "@hugeicons/core-free-icons";
import Icon from "../../components/ui/Icon.vue";
import type { CompanyRow } from "../../components/table/Table.vue";
import Table from "../../components/table/Table.vue";
import Card from "../../components/ui/Card.vue";

const rows: CompanyRow[] = [
	{
		id: 1,
		company: {
			name: "Dixons",
			website: "megacorp.io",
		},
		category: {
			name: "Technology",
		},
		views: {
			value: "23.4k",
			subtitle: "in 24 hours",
		},
		revenue: "$891.2",
		sales: {
			percentage: 68,
			trend: "down",
		},
	},
	{
		id: 2,
		company: {
			name: "Motels",
			website: "vacaylodges.co.uk",
		},
		category: {
			name: "Grocery",
		},
		views: {
			value: "78k",
			subtitle: "in 2 days",
		},
		revenue: "$668.51",
		sales: {
			percentage: 97,
			trend: "up",
		},
	},
	{
		id: 2,
		company: {
			name: "Motels",
			website: "vacaylodges.co.uk",
		},
		category: {
			name: "Grocery",
		},
		views: {
			value: "78k",
			subtitle: "in 2 days",
		},
		revenue: "$668.51",
		sales: {
			percentage: 97,
			trend: "up",
		},
	},
	{
		id: 2,
		company: {
			name: "Motels",
			website: "vacaylodges.co.uk",
		},
		category: {
			name: "Grocery",
		},
		views: {
			value: "78k",
			subtitle: "in 2 days",
		},
		revenue: "$668.51",
		sales: {
			percentage: 97,
			trend: "up",
		},
	},
];
</script>

<template>
	<div class="grid grid-cols-12 gap-6">
		<Card class="col-span-12 lg:col-span-8">
			<div class="flex justify-between items-center">
				<p class="text-xl font-bold">Statics</p>
				<p class="text-black/60">Updated 1 mouth ago</p>
			</div>

			<div class="flex justify-between space-x-6">
				<div class="flex items-center space-x-6">
					<div class="h-12 w-12 bg-indigo-50 text-indigo-500 rounded-full flex justify-center items-center">
						<Icon :icon="Analytics03Icon" />
					</div>
					<p>
						<span class="text-lg font-bold block leading-4">230k</span>
						<span class="text-sm text-black/60">Sales</span>
					</p>
				</div>
				<div class="flex items-center space-x-6">
					<div class="h-12 w-12 bg-cyan-50 text-cyan-500 rounded-full flex justify-center items-center">
						<Icon :icon="UserIcon" />
					</div>
					<p>
						<span class="text-lg font-bold block leading-4">230k</span>
						<span class="text-sm text-black/60">Customers</span>
					</p>
				</div>
				<div class="flex items-center space-x-6">
					<div class="h-12 w-12 bg-rose-50 text-rose-500 rounded-full flex justify-center items-center">
						<Icon :icon="PackageIcon" />
					</div>
					<p>
						<span class="text-lg font-bold block leading-4">230k</span>
						<span class="text-sm text-black/60">Products</span>
					</p>
				</div>
				<div class="flex items-center space-x-6">
					<div class="h-12 w-12 bg-green-50 text-green-500 rounded-full flex justify-center items-center">
						<Icon :icon="Dollar01Icon" />
					</div>
					<p>
						<span class="text-lg font-bold block leading-4">230k</span>
						<span class="text-sm text-black/60">Revenue</span>
					</p>
				</div>
			</div>
		</Card>

		<Table :rows class="col-span-4 row-span-3"> Recent Purcahses </Table>

		<div class="grid grid-cols-3 col-span-12 lg:col-span-8 gap-6">
			<Card>
				<div class="flex justify-between items-center">
					<div class="font-bold">
						<p class="">Orders</p>
						<p class="text-xl">200</p>
					</div>

					<div class="h-12 w-12 bg-indigo-50 text-indigo-500 rounded-full flex justify-center items-center">
						<Icon :icon="Chart01Icon" />
					</div>
				</div>
			</Card>
			<Card>
				<div class="flex justify-between items-center">
					<div class="font-bold">
						<p class="">Profit</p>
						<p class="text-xl">200</p>
					</div>

					<div class="h-12 w-12 bg-green-50 text-green-500 rounded-full flex justify-center items-center">
						<Icon :icon="ChartUpIcon" />
					</div>
				</div>
			</Card>

			<Card>
				<div class="flex justify-between items-center">
					<div class="font-bold">
						<p class="">Expenses</p>
						<p class="text-xl">200</p>
					</div>

					<div class="h-12 w-12 bg-red-50 text-red-500 rounded-full flex justify-center items-center">
						<Icon :icon="ChartDownIcon" />
					</div>
				</div>
			</Card>
		</div>

		<Table :rows class="col-span-8"> Top </Table>
	</div>
</template>
