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

const onEdit = () => {
  // rulesStore.editRule(props.rule.id)
}

const onDuplicate = () => {
  if (props.rule.type === 'group') {
    return rulesStore.duplicateGroup(props.rule.id)
  }

  return rulesStore.duplicateRule(props.rule.id)
}

const onDelete = () => {
  if (props.rule.type === 'group') {
    return rulesStore.deleteGroup(props.rule.id)
  }

  return rulesStore.deleteRule(props.rule.id)
}

const onExpand = (event: MouseEvent) => {
  if (event.target !== event.currentTarget) {
    return
  }
  if (props.rule.type === 'group') {
    return rulesStore.toggleGroupExpanded(props.rule.id)
  }

  return rulesStore.toggleRuleExpanded(props.rule.id)
}
</script>

<template>
  <button
    type="button"
    class="flex justify-between items-center"
    @click="onExpand"
  >
    <div class="flex gap-4 items-center">
      <IconGroup
        v-if="rule.type === 'group'"
        width="16"
        height="16"
      />
      <h2 class="text-xl font-medium">{{ rule.title }}</h2>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <ButtonIcon :color="rule.type === 'group' ? 'dark' : 'darker'">
            <IconMore />
          </ButtonIcon>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="onEdit">Edit</DropdownMenuItem>
          <DropdownMenuItem @click="onDuplicate">Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="onDelete">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
