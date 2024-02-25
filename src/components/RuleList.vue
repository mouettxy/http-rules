<script setup lang="ts">
import { useRulesStore } from '@/stores/rules.store'

const rulesStore = useRulesStore()
const rules = computed(() => rulesStore.rules)
</script>

<template>
  <ul class="flex flex-col gap-4">
    <li
      v-for="rule in rules"
      :key="rule.id"
    >
      <RuleGroup
        v-if="rule.type === 'group'"
        :group="rule"
      />
      <Rule
        v-else-if="rule.type === 'rule'"
        :rule="rule"
      />
    </li>
  </ul>
</template>

<style scoped></style>
