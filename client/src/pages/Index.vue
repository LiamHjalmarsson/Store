<script setup lang="ts">
import { onMounted, ref } from "vue";
import background from "../assets/images/bg.jpg"
import Card from "../components/ui/Card.vue";
import CategoryCard from "../components/category/CategoryCard.vue";
import { useCategoryStore } from "../store/category";
import { storeToRefs } from "pinia";
import UserCard from "../components/ui/UserCard.vue";
import { getUsers, type User } from "../api/user/user";

const categoryStore = useCategoryStore();

const { categories: featuredCategories} = storeToRefs(categoryStore)


const creators = ref<User[]>([]);

onMounted(async () => {
	await categoryStore.fetchCategories();

	const resUsers = await getUsers();

	
	creators.value = resUsers.data.users.filter((user) => user.role === 'creator');
});
</script>

<template>
	<div class="min-h-[85vh] relative">
		<div class="min-h-[75vh] bg-slate-100 w-full h-full  py-24 p-24 flex justify-center items-center">
			<div class="space-y-48 m-auto">
				<div class="flex space-x-20 xl:space-x-48 items-center">
					<div class="flex-1 space-y-12">
						<h1 class="text-7xl font-bold">
							Discover digital products
						</h1>
						<p>
							Crated to find digital products in diffrent categroeis 
						</p>

						<button class="px-12 py-3 bg-indigo-500 font-bold text-white rounded-2xl">
							Get started 
						</button>
					</div>
					<div class="grid grid-cols-2 grid-rows-3 gap-3 min-w-120 max-w-162 max-h-160">
						<img :src="background" alt="" class="rounded-2xl h-full w-full object-cover col-span-1 row-span-1"></img>
						<img :src="background" alt="" class="rounded-2xl h-full w-full object-cover col-span-1 row-span-2"></img>
						<img :src="background" alt="" class="rounded-2xl h-full w-full object-cover col-span-1 row-span-2"></img>
						<img :src="background" alt="" class="rounded-2xl h-full w-full object-cover col-span-1 row-span-1"></img>
					</div>
				</div>
			</div>
		</div>
		<div class="-mt-12 bg-white/10 fill-transparent backdrop-blur-lg flex w-1/2 px-12 py-6 mx-auto justify-between items-center rounded-2xl shadow">
			<div class="text-center">
				<p class=" text-2xl font-bold">
					240k+
				</p>
				<p class=" font-light">
					Items
				</p>
			</div>
			<div class="text-center">
				<p class=" text-2xl font-bold">
					240k+
				</p>
				<p class=" font-light">
					Customers
				</p>
			</div>
			<div class="text-center">
				<p class=" text-2xl font-bold">
					240k+
				</p>
				<p class=" font-light">
					Total Sale
				</p>
			</div>
		</div>
	</div>

	<div class="container mx-auto space-y-6 py-20">
		<div class="space-y-3">
			<h2 class="text-5xl font-bold">
				How it works
			</h2>
			<p class="text-black/80">
				Checkout Our Weelky updated Trending collection
			</p>
		</div>
	</div>

	<div class="relative w-full h-120 flex justify-end items-end px-48">
		<div class=" absolute h-full w-full z-10 bg-linear-to-b/decreasing from-black/20 to-black/40 inset-0">

		</div>

		<img :src="background" alt="" class="absolute w-full h-full inset-0 object-covers">

		<div class="relative z-10 py-20  w-full">
			<div class="flex justify-between items-center text-white">
				<div class="space-y-6">
					<div class="bg-black py-1.5 text-sm text-center rounded-2xl capitalize">
						namn
					</div>
					<h2 class=" text-5xl font-bold ">
						Title
					</h2>
					<div>
						<button class="py-3 px-12 bg-rose-600 rounded-2xl font-bold ">
							Buy
						</button>
					</div>
				</div>
				<div class=" p-6 rounded-2xl bg-black/10 fill-transparent backdrop-blur-lg space-y-12">
					<h3>New relase in:</h3>
					<div class="flex space-x-12">
						<div class="font-semibold">
							<p class="text-3xl">59</p>
							<p class="">hours</p>
						</div>
						<div class="font-semibold">
							<p class="text-3xl">59</p>
							<p class="">minits</p>
						</div>
						<div class="font-semibold">
							<p class="text-3xl">59</p>
							<p class="">secounds</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="container mx-auto space-y-6 py-20">
		<div class="space-y-6">
			<h2 class="text-5xl font-bold">
				Categories
			</h2>
			<p class="text-black/80">
				Checkout Our Weelky updated Trending collection
			</p>
		</div>

		<div class="grid grid-cols-3 gap-3">
			<CategoryCard v-for="category in featuredCategories" :key="category.id" :category :class="['rounded-2xl relative overflow-hidden shadow-xl min-h-56 text-3xl']" />
		</div>
	</div>

	<div class="container mx-auto space-y-6 py-20">
		<div class="space-y-6">
			<h2 class="text-5xl font-bold">
				Creators
			</h2>
			<p class="text-black/80">
				Checkout Our Weelky updated Trending collection
			</p>
		</div>

		<div class=" grid grid-cols-3 space-x-6">
			<UserCard v-for="creator in creators" :key="creator.id" :user="creator" />
		</div>
	</div>

	<Card class="container mx-auto">
		<div class="flex items-center space-x-28 ">
			<div class="flex-1">
				<img :src="background" alt="" class=" rounded-2xl"></img>
			</div>

			<div class="flex-1 space-y-6">
				<h3 class="text-4xl font-bold">
					Join our community
				</h3>
				<p>
					Get promotions & updates.
				</p>

				<div class="relative flex border border-black/30 overflow-hidden rounded-2xl">
					<div class="relative flex-1">
						<label for="email" class="hidden"></label>
						<input id="email" class="h-full w-full outline-0 px-6" />
					</div>
					<button class="px-6 py-3 bg-rose-600 text-white font-bold cursor-pointer">
						Sing up
					</button>
				</div>
			</div>
		</div>
	</Card>
</template>
