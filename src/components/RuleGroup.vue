<script setup lang="ts">
import { RuleGroup } from '@/types'
import IconAdd from '@/assets/add.svg'
import { useRulesStore } from '@/stores/rules.store'

const props = defineProps<{
  group: RuleGroup
}>()
const rulesStore = useRulesStore()
</script>

<template>
  <section class="bg-gray-100 border border-gray-200 rounded-lg p-4 w-full flex flex-col gap-6">
    <RuleHeader :rule="group" />

    <ul class="flex flex-col gap-6">
      <li
        v-for="rule in group.rules"
        :key="rule.id"
      >
        <Rule :rule="rule" />
      </li>
    </ul>

    <Button
      color="gray"
      class="w-max"
      size="small"
      @click="rulesStore.addRule(group.id)"
    >
      <IconAdd
        width="24"
        height="24"
      />
      Add Rule
    </Button>
  </section>
</template>

<style scoped></style>
