<script setup lang="ts">
import { useRulesStore } from '@/stores/rules.store'
import { Rule, RuleSetActionType, RuleSetItem, RuleSetMatchCompare, RuleSetMatchType, RuleSetActionFileType } from '@/types'
import IconDuplicate from '@/assets/duplicate.svg'
import IconDelete from '@/assets/delete.svg'

const props = defineProps<{
  rule: Rule
  ruleset: RuleSetItem
}>()

const rulesStore = useRulesStore()

const matchType = computed({
  get: () => props.ruleset.match.type,
  set: (value: RuleSetMatchType) => {
    rulesStore.updateMatchType(props.rule.id, props.ruleset.id, value)
  },
})
const matchCompare = computed({
  get: () => props.ruleset.match.compare,
  set: (value: RuleSetMatchCompare) => {
    rulesStore.updateMatchCompare(props.rule.id, props.ruleset.id, value)
  },
})
const actionType = computed({
  get: () => props.ruleset.action.type,
  set: (value: RuleSetActionType) => {
    rulesStore.updateActionType(props.rule.id, props.ruleset.id, value)

    if (value === 'insert') {
      rulesStore.updateActionFileType(props.rule.id, props.ruleset.id, 'js')
    } else {
      rulesStore.updateActionFileType(props.rule.id, props.ruleset.id, undefined)
    }
  },
})
const actionFileType = computed<string | undefined>({
  get: () => props.ruleset.action.fileType,
  set: (value: unknown) => {
    rulesStore.updateActionFileType(props.rule.id, props.ruleset.id, value as RuleSetActionFileType)
  },
})
const matchUrl = computed({
  get: () => props.ruleset.match.url,
  set: (value: string) => {
    rulesStore.updateMatchUrl(props.rule.id, props.ruleset.id, value)
  },
})
const actionUrl = computed({
  get: () => props.ruleset.action.url,
  set: (value: string) => {
    rulesStore.updateActionUrl(props.rule.id, props.ruleset.id, value)
  },
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2">
      <Select
        v-model="matchType"
        :options="[
          { value: 'url', label: 'URL' },
          { value: 'host', label: 'Host' },
          { value: 'path', label: 'PATH' },
        ]"
      />
      <Select
        v-model="matchCompare"
        :options="[
          { value: 'contains', label: 'Contains' },
          { value: 'equals', label: 'Equals' },
          { value: 'regex', label: 'Regex' },
        ]"
      />
      <Input
        v-model="matchUrl"
        placeholder="https://example.com"
      />
      <ButtonIcon
        color="gray-filled"
        @click="rulesStore.duplicateRuleSet(props.rule.id, props.ruleset.id)"
      >
        <IconDuplicate />
      </ButtonIcon>
      <ButtonIcon
        v-if="rule.rulesets.length > 1"
        color="gray-filled"
        @click="rulesStore.deleteRuleSet(props.rule.id, props.ruleset.id)"
      >
        <IconDelete />
      </ButtonIcon>
    </div>
    <div class="flex gap-2">
      <Select
        v-model="actionType"
        :options="[
          { value: 'redirect', label: 'Redirect' },
          { value: 'replace', label: 'Replace string' },
          { value: 'insert', label: 'Insert file' },
          { value: 'block', label: 'Block' },
        ]"
      />
      <Select
        v-if="actionType === 'insert'"
        v-model="actionFileType"
        :options="[
          { value: 'js', label: 'JS' },
          { value: 'css', label: 'CSS' },
        ]"
      />
      <Input
        v-model="actionUrl"
        placeholder="https://example.com"
      />
    </div>
  </div>
</template>

<style scoped></style>
