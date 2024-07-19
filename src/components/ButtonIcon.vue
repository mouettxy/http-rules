<script setup lang="ts">
import { useAttrs } from 'vue'
import { classMerge } from '@/utils/classMerge'

const props = withDefaults(
  defineProps<{
    color?: 'dark' | 'darker' | 'gray-filled'
    size?: 'small' | 'default'
    active?: boolean
  }>(),
  {
    color: 'dark',
    size: 'default',
    active: false,
  }
)
const attrs = useAttrs()

const style = computed(() => {
  const classes = (attrs.class || '') as string
  return classMerge([
    'btn-icon',
    `btn-icon-${props.color}`,
    `btn-icon--size-${props.size}`,
    props.active && `btn-icon--active`,
    ...classes.split(' '),
  ])
})

defineEmits(['click'])
</script>

<template>
  <button
    :class="style"
    type="button"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn-icon {
  @apply rounded-md cursor-pointer flex gap-2 justify-center items-center transition-colors duration-100 shrink-0;
}

.btn-icon-dark {
  @apply text-gray-1000;
}
.btn-icon-dark:hover {
  @apply bg-gray-100;
}
.btn-icon-dark:active {
  @apply bg-gray-200;
}

.btn-icon-darker {
  @apply text-gray-1000;
}
.btn-icon-darker:hover {
  @apply bg-gray-100;
}
.btn-icon-darker:active {
  @apply bg-gray-200;
}

.btn-icon-gray-filled {
  @apply bg-gray-200;
}
.btn-icon-gray-filled:hover {
  @apply bg-gray-300;
}
.btn-icon-gray-filled:active {
  @apply bg-gray-400;
}

.btn-icon--size-default {
  @apply size-8;
}

.btn-icon--active {
  @apply text-primary;
}
</style>
