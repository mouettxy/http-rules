<script setup lang="ts">
const model = defineModel<boolean>()
</script>

<template>
  <label class="relative cursor-pointer w-8 h-4 bg-gray-300 rounded-full transition-shadow duration-100 checkbox-label">
    <input
      v-model="model"
      type="checkbox"
      class="sr-only"
    />
    <div
      class="absolute cursor-pointer transition-transform duration-100 top-0 left-0 w-4 h-4 rounded-full"
      :class="{
        'translate-x-full bg-primary': model,
        'translate-x-0 bg-gray-600': !model,
      }"
    ></div>
  </label>
</template>
