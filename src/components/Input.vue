<script setup lang="ts">
const model = defineModel<string>()
const props = defineProps<{
  placeholder?: string
}>()
</script>

<template>
  <input
    v-model="model"
    class="appearance-none bg-none px-4 py-1 text-base text-gray-1000 border-0 bg-gray-300 flex items-center rounded-md w-full"
    :placeholder="placeholder"
  />
</template>
