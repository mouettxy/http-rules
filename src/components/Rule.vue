<script setup lang="ts">
import { Rule } from '@/types'
import IconAdd from '@/assets/add.svg'
import { useRulesStore } from '@/stores/rules.store'

const props = defineProps<{
  rule: Rule
}>()
const rulesStore = useRulesStore()
</script>

<template>
  <section class="bg-gray-50 border-2 border-gray-50 rounded-lg p-4 w-full flex flex-col gap-6">
    <RuleHeader :rule="rule" />

    <template v-if="rule.expanded">
      <ul class="flex flex-col gap-6">
        <li
          v-for="ruleset in rule.rulesets"
          :key="ruleset.id"
        >
          <RuleSet
            :rule="rule"
            :ruleset="ruleset"
          />
        </li>
      </ul>

      <Button
        color="gray"
        class="w-max"
        size="small"
        @click="rulesStore.addRuleSet(rule.id)"
      >
        <IconAdd
          width="24"
          height="24"
        />
        Add Condition
      </Button>
    </template>
  </section>
</template>

<style scoped></style>
