<script setup lang="ts">
import image from "../../assets/images/bg.jpg";
</script>

<template>
	<main class="h-screen flex items-center justify-center p-12 space-x-12">
		<div class="flex-1 flex items-center justify-center">
			<div class="p-6 space-y-12 w-fit">
				<div class="space-y-6">
					<h1 class="text-7xl font-bold">Welcome back</h1>
					<p>Motivation</p>
				</div>

				<form class="space-y-6">
					<div class="relative">
						<label for="" class="absolute top-3 left-6 hidden"></label>
						<input
							placeholder="Email"
							class="px-6 py-3 border border-black/10 w-full rounded-xl outline-0" />
					</div>
					<div class="relative">
						<label for="" class="absolute top-3 left-6 hidden"></label>
						<input
							placeholder="Password"
							class="px-6 py-3 border border-black/10 w-full rounded-xl outline-0" />
					</div>

					<div class="text-end text-blue-500 font-semibold">
						<RouterLink :to="{ name: 'forgot-password' }"> Forogt Password? </RouterLink>
					</div>

					<button
						type="submit"
						class="w-full py-3 text-center bg-black/80 text-white font-semibold rounded-2xl cursor-pointer">
						Sign in
					</button>
				</form>

				<div class="text-center">
					Don't have an account ?
					<RouterLink :to="{ name: 'register' }" class="text-blue-500 font-semibold"> Sign up </RouterLink>
				</div>
			</div>
		</div>
		<div class="flex-1 w-full h-full relative overflow-hidden rounded-2xl">
			<img :src="image" class="absolute w-full h-full object-cover" />
		</div>
	</main>
</template>
