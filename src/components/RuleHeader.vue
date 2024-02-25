<script setup lang="ts">
import { Rule, RuleGroup } from '@/types'
import IconGroup from '@/assets/group.svg'
import IconPin from '@/assets/pin.svg'
import IconMore from '@/assets/more.svg'
import { useRulesStore } from '@/stores/rules.store'

const props = defineProps<{
  rule: RuleGroup | Rule
}>()

const rulesStore = useRulesStore()

const ruleEnabled = computed({
  get: () => props.rule.enabled,
  set: (value: boolean) => {
    rulesStore.updateRuleEnabled(props.rule.id, value)
  },
})
const rulePinned = computed({
  get: () => props.rule.pinned,
  set: (value: boolean) => {
    rulesStore.updateRulePinned(props.rule.id, value)
  },
})
</script>

<template>
  <button
    type="button"
    class="flex justify-between items-center"
  >
    <div class="flex gap-4 items-center">
      <IconGroup
        v-if="rule.type === 'group'"
        width="16"
        height="16"
      />
      <h2 class="text-xl font-medium">{{ rule.title }}</h2>
      <ButtonIcon :color="rule.type === 'group' ? 'dark' : 'darker'">
        <IconMore />
      </ButtonIcon>
    </div>
    <div class="flex gap-6 items-center">
      <ButtonIcon
        size="default"
        :color="rule.type === 'group' ? 'dark' : 'darker'"
        :active="rulePinned"
        @click="rulePinned = !rulePinned"
      >
        <IconPin />
      </ButtonIcon>
      <Switch v-model="ruleEnabled" />
    </div>
  </button>
</template>

<style scoped></style>
