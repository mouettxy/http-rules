<script setup lang="ts">
import { useAttrs } from 'vue'
import { classMerge } from '@/utils/classMerge'

const props = defineProps({
  color: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'default',
  },
})
const attrs = useAttrs()

const style = computed(() => {
  const classes = (attrs.class || '') as string
  return classMerge([
    'btn',
    `btn-${props.color}`,
    `btn--size-${props.size}`,
    ...classes.split(' '),
  ])
})

defineEmits(['click'])
</script>

<template>
  <button
    :class="style"
    v-bind="attrs"
    type="button"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  @apply rounded-md cursor-pointer flex gap-2 items-center transition-opacity duration-100;
}
.btn:hover {
  @apply opacity-90;
}
.btn:active {
  @apply opacity-80;
}

.btn-primary {
  @apply bg-primary text-gray-50;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-1000;
}

.btn-gray {
  @apply bg-gray-300 text-gray-1000;
}

.btn--size-default {
  @apply px-6 py-2 text-base;
}
.btn--size-small {
  @apply px-3 py-1 text-sm;
}
</style>
