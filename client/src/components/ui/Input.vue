<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
	modelValue?: string;
	label?: string;
	id?: string;
	type?: string;
	required?: boolean;
	error?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);

const inputId = computed(() => props.id || `input-${Math.random().toString(36).slice(2)}`);

const isActive = computed(() => isFocused.value || !!props.modelValue);

const hasError = computed(() => !!props.error);
</script>

<template>
	<div class="w-full relative">
		<label
			v-if="label"
			:for="inputId"
			:class="[
				'absolute left-6 transform transition-all duration-300 pointer-events-none  text-sm text-black/60 bg-white',
				isActive ? '-top-3' : 'top-1/2 -translate-y-1/2 ',
			]">
			{{ label }}
		</label>

		<input
			:id="inputId"
			:type="type || 'text'"
			:value="modelValue"
			:required="required"
			@focus="isFocused = true"
			@blur="isFocused = false"
			@input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
			class="px-6 py-3 border w-full rounded-xl outline-0 transition border-black/10 focus:ring focus:ring-black/20" />

		<p v-if="hasError" class="mt-2 px-1 text-sm text-red-500">
			{{ error }}
		</p>
	</div>
</template>
