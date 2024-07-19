<script setup lang="ts">
const model = defineModel<string>()
const props = defineProps<{
  options: { value: string; label: string }[]
}>()
</script>

<template>
  <select
    v-model="model"
    class="appearance-none bg-none px-2 py-1 text-base text-gray-1000 border-0 bg-gray-200 flex items-center rounded-md"
  >
    <option
      v-for="option in props.options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>
