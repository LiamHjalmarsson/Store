<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
	modelValue?: string;
	label?: string;
	id?: string;
	type?: string;
	required?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const inputId = computed(() => props.id || `input-${Math.random().toString(36).slice(2)}`);
</script>

<template>
	<div class="w-full relative">
		<label v-if="label" :for="inputId" class="absolute top-4 left-6 text-sm font-medium text-black/70">
			{{ label }}
		</label>

		<input
			:id="inputId"
			:type="type || 'text'"
			:value="modelValue"
			:required="required"
			@input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
			class="px-6 py-3 border w-full rounded-xl outline-0 transition border-black/10 focus:ring-2 focus:ring-black/20" />
	</div>
</template>
